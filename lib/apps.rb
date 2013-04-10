require 'sinatra/base'
require 'sanitize'

module Sinatra
  module Apps
    def self.registered(app)
      app.helpers Apps::Helpers
      
      # list all the apps
      app.get "/api/v1/apps" do
        list = apps_list(request)
        json_result(list.to_json)
      end
      
      app.get "/api/v1/app_categories" do
        data = App.load_apps
        categories = data.map{|d| d['categories'] }.flatten.compact.uniq.sort
        list = {
          :levels => AppParser::LEVELS,
          :categories => AppParser::CATEGORIES,
          :extensions => AppParser::EXTENSIONS,
          :privacy_levels => AppParser::PRIVACY_LEVELS,
          :app_types => AppParser::APP_TYPES
        }
        list.to_json
      end
      
      # single app details
      app.get "/api/v1/apps/:tool_id" do
        host = request.scheme + "://" + request.host_with_port
        return @error unless get_tool
        json_result(fix_tool(@tool, @tool_summary).to_json)
      end
      
      # list all the reviews for an app
      app.get "/api/v1/apps/:tool_id/reviews" do
        host = request.scheme + "://" + request.host_with_port
        limit = 15
        return @error unless get_tool
        return @error if params[:only_for_token] && !confirm_token
        return @error if params[:for_current_user] && !confirm_token
        reviews = AppReview.all(:tool_id => params[:tool_id], :comments.not => nil, :order => [:id.desc])
        reviews = reviews.all(:external_access_token_id => @token.id) if params[:only_for_token]
        reviews = reviews.all(:external_access_token_id => @token.id, :user_name => session[:user_key]) if params[:for_current_user]
        total = reviews.count
        offset = params[:offset].to_i
        found_reviews = reviews.all(:offset => offset, :limit => limit)
        next_url = total > offset + limit ? (host + "/api/v1/apps/#{params[:tool_id]}/reviews?offset=#{offset+limit}") : nil
        if params['no_meta']
          next_url += "&no_meta=1" if next_url
          result = found_reviews.map{|r| review_as_json(r) }
        else
          result = {
            :meta => {:next => next_url},
            :current_offset => offset,
            :limit => limit,
            :objects => found_reviews.map{|r| review_as_json(r) }
          }
        end
        response.headers['Link'] = "<#{next_url}>; rel=\"next\"" if next_url
        json_result(result.to_json)
      end
      
      app.post "/api/v1/filter" do
        halt 400, {:error => "Not logged in"}.to_json unless session['user_key']
        @filter = AppFilter.first_or_new(:username => "@#{session['user_key']}")
        @filter.update_settings(params)
        json_result(@filter.to_json)
      end
      
      # review an app
      app.post "/api/v1/apps/:tool_id/reviews" do
        host = request.scheme + "://" + request.host_with_port
        return @error unless confirm_token && get_tool
        if @internal_token && key = session[:user_key]
          params[:user_name] = key
          params[:user_url] = "https://twitter.com/#{key}"
          params[:user_id] = key
          params[:user_avatar_url] = "https://api.twitter.com/1/users/profile_image/#{key}"
        end
        required_fields = [:user_name, :user_id, :rating]
        optional_fields = [:user_avatar_url, :comments, :user_url]
        required_fields.each do |field|
          if !params[field] || params[field].empty?
            return {:message => "The field '#{field}' is required", :type => 'error'}.to_json
          end
        end
        optional_fields.each do |field|
          params.delete(field) if params[field] && params[field].empty?
        end
        review = AppReview.first_or_new(:tool_id => params[:tool_id], :external_access_token_id => @token.id, :user_id => params[:user_id])
        review.tool_name = @tool['name']
        review.created_at ||= Time.now
        (required_fields + optional_fields).each do |field|
          review.send("#{field}=", sanitize(params[field])) if params[field]
        end
        review.save!
        @tool_summary.update_counts
        json = review_as_json(review)
        json['app'] = fix_tool(@tool, @tool_summary)
        json_result(json.to_json)
      end

      app.get "/data/app_reviews.atom" do
        reviews = AppReview.all(:created_at.gt => (Date.today - 60), :order => :id.desc)
        host = request.scheme + "://" + request.host_with_port
        headers 'Content-Type' => 'application/atom+xml'
        xml = <<-XML
<?xml version="1.0" encoding="utf-8"?>
           
          <feed xmlns="http://www.w3.org/2005/Atom">
           
                  <title>LTI App Reviews</title>
                  <subtitle>A list of recent reviews of LTI apps</subtitle>
                  <link href="#{host}/data/app_reviews.atom" rel="self" />
                  <link href="#{host}/" />
                  <id>urn:uuid:2d6341a0-a046-11e1-a8b1-0800200c9a67</id>
                  <updated>#{Time.now.iso8601}</updated>    
        XML
        reviews.each do |review|
          
          url = "#{host}/tools.html?tool=#{review.tool_id}"
          xml += <<-XML
            <entry>
              <title>#{review.user_name} -- #{review.tool_name}</title>
              <link href="#{host}/index.html?tool=#{review.tool_id}" />
              <id>#{review.id}</id>
              <updated>#{review.created_at.iso8601}</updated>
              <summary>#{review.rating} star(s). #{review.comments}</summary>
              <author>
                    <name>#{ review.user_name }</name>
                    <url>#{ review.user_url }</url>
              </author>        
            </entry>
          XML
        end
        xml += <<-XML
          </feed>
        XML
        xml
        
      end
      
      app.get "/data/lti_apps.atom" do
        data = apps_list(request, false).select{|a| !a['pending'] }
        host = request.scheme + "://" + request.host_with_port
        headers 'Content-Type' => 'application/atom+xml'
        xml = <<-XML
<?xml version="1.0" encoding="utf-8"?>
           
          <feed xmlns="http://www.w3.org/2005/Atom">
           
                  <title>LTI Apps</title>
                  <subtitle>A list of known LTI apps</subtitle>
                  <link href="#{host}/data/lti_apps.atom" rel="self" />
                  <link href="#{host}/" />
                  <id>urn:uuid:2d6341a0-a046-11e1-a8b1-0800200c9a66</id>
                  <updated>#{Time.now.iso8601}</updated>    
        XML
        data.each do |app|
          url = app['data_url'] ? "#{host}/tools.html?tool=#{app['id']}" : "#{host}/index.html?tool=#{app['id']}"
          xml += <<-XML
            <entry>
              <title>#{app['name']}</title>
              <link href="#{host}/index.html?tool=#{app['id']}" />
              <id>#{app['id']}</id>
              <updated>#{app['added']}</updated>
              <summary>#{app['description'] || app['short_description']}</summary>
              <author>
                    <name>LTI Examples</name>
              </author>        
            </entry>
          XML
        end
        xml += <<-XML
          </feed>
        XML
        xml
      end

    end
    module Helpers
      def sanitize(raw)
        Sanitize.clean(raw)
      end
    
      def apps_list(request, paginated=true)
        host = request.scheme + "://" + request.host_with_port
        limit = 24
        params = request.params
        offset = params['offset'].to_i
        filter = AppFilter.first(:code => params['filter'])
        
        data = App.load_apps(filter).sort_by{|a| [(0 - (a['uses'] || 0)), a['name'].downcase || 'zzz'] }
        [['category', 'categories'], ['level', 'levels'], ['extension', 'extensions']].each do |filter, key|
          if params[filter] && params[filter].length > 0
            if params[filter] == 'all'
              data = data.select{|e| e[key] }
            else
              data = data.select{|e| e[key] && e[key].include?(params[filter]) }
            end
          end
        end
        if params['pending']
          if admin?
            data = App.all(:pending => true).map{|a| a.settings || {}}
          else
            data = []
          end
        end
        if params['recent'] && params['recent'].length > 0
          data = data.sort{|a, b| b['added'] <=> a['added'] }
          cutoff = (Time.now - (60 * 60 * 24 * 7 * 24)).utc.iso8601
          recent = data.select{|e| e['added'] > cutoff}
          if recent.length < 6
            data = data[0, 6]
          else
            data = recent
          end
        end
        if params['public'] && params['public'].length > 0
          data = data.select{|e| (e['app_type'] == 'open_launch' || e['app_type'] == 'data') }
        end
        if params['platform'] && params['platform'].length > 0 
          if params['platform'] == 'Canvas'
            bad_tools = ['titanpad', 'flickr']
            data = data.select{|e| !bad_tools.include?(e['id']) }
          else
            bad_tools = ['wolfram', 'wiktionary']
            data = data.select{|e| !bad_tools.include?(e['id']) }
          end
        end
        found_data = data
        if paginated
          found_data = found_data[offset, limit]
        end
        summaries = App.all(:tool_id => found_data.map{|d| d['id'] })
        found_data = found_data.map do |tool|
          summary = summaries.detect{|s| s.tool_id == tool['id'] }
          fix_tool(tool, summary || false)
        end
        if paginated
          next_url = data.length > offset + limit ? (host + "/api/v1/apps?offset=#{offset + limit}") : nil
          if next_url
            ['filter', 'no_meta', 'category', 'level', 'extension', 'recent', 'public', 'platform', 'pending'].each do |key|
              next_url += "&#{key}=#{CGI.escape(params[key])}" if params[key]
            end
            response.headers['Link'] = "<#{next_url}>; rel=\"next\""
          end
          if params['no_meta']
            found_data
          else
            {
              :meta => {:next => next_url},
              :current_offset => offset,
              :limit => limit,
              :objects => found_data
            }
          end
        else
          data
        end
      end
      
      def fix_tool(tool, tool_summary)
        host = request.scheme + "://" + request.host_with_port
        if tool_summary
          tool['ratings_count'] = tool_summary.ratings_count
          tool['comments_count'] = tool_summary.comments_count
          tool['avg_rating'] = tool_summary.avg_rating
        end
        tool['ratings_count'] ||= 0
        tool['comments_count'] ||= 0
        tool['banner_url'] ||= "/tools/#{tool['id']}/banner.png"
        tool['logo_url'] ||= "/tools/#{tool['id']}/logo.png"
        tool['icon_url'] ||= "/tools/#{tool['id']}/icon.png"
        cutoff = (Time.now - (60 * 60 * 24 * 7 * 24)).utc.iso8601
        tool['new'] = tool['added'] && tool['added'] > cutoff


        tool['config_url'] ||= "/tools/#{tool['id']}/config.xml" if !tool['config_directions']
        
        if tool['app_type'] == 'data'
          tool['data_url'] ||= "/tools/#{tool['id']}/data.json"
          tool['extensions'] = ["editor_button", "resource_selection"]
          tool['any_key'] = true
          tool['preview'] ||= {
            "url" => "/tools/public_collections/index.html?tool=#{tool['id']}",
            "height" => tool['height'] || 475
          }
          
        elsif tool['app_type'] == 'open_launch'
          tool['any_key'] = true
          tool['extensions'] = ["editor_button", "resource_selection"]
          tool['preview'] ||= {
            "url" => "/tools/#{tool['id']}/index.html",
            "height" => tool['height'] || 475
          }
        end
        ['big_image_url', 'image_url', 'icon_url', 'banner_url', 'logo_url', 'config_url', 'launch_url'].each do |key|
          tool[key] = prepend_host(tool[key], host) if tool[key]
        end
        tool
      end
      
      def prepend_host(path, host)
        if path.is_a?(Array)
          return path.map do |elem|
            elem['url'] = prepend_host(elem['url'], host)
            elem
          end
        end
        path = host + path if path && path.match(/^\//)
        path
      end
      
      def json_result(json)
        if params['callback']
          return "#{params['callback']}(#{json})"
        else
          return json
        end
      end
        
      def review_as_json(review)
        fields = [:id, :user_name, :user_url, :user_avatar_url, :tool_name, :rating, :comments, :source_name, :source_url]
        res = {}
        res['created'] = review.created_at.strftime("%b %e, %Y")
        fields.each do |field|
          res[field] = review.send(field)
        end
        res
      end
      
      def confirm_token
        if session[:user_key]
          @token = ExternalAccessToken.first(:name => "LTI-Examples", :active => true)
          @internal_token = true
        else
          @token = ExternalAccessToken.first(:token => params['access_token'], :active => true)
        end
        if !@token
          @error = {:message => "Invalid token", :type => "error"}.to_json
          false
        else
          @token
        end
      end
      
      def get_tool
        id = params[:tool_id]
        @tool_summary = App.first(:tool_id => id )
        if @tool_summary && @tool_summary.pending
          @tool_summary = nil unless admin?(id)
        end
        
        if @tool_summary && @tool_summary.settings
          @tool = @tool_summary.settings
        else
          data = App.load_apps
          @tool = data.detect{|t| t['id'] == id }
          @tool_summary = App.first_or_create(:tool_id => @tool['id'] ) if @tool && !@tool['pending']
        end
        if !@tool
          @error = {:message => "Tool not found", :type => "error"}.to_json
          false
        else
          @tool
        end
      end
    end
    
  end
  register Apps
end