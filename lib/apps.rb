require 'sinatra/base'
require 'sanitize'

module Sinatra
  module Apps
    # list all the apps
    get "/api/v1/apps" do
      list = apps_list(request)
      json_result(list.to_json)
    end
    
    get "/api/v1/app_categories" do
      data = JSON.parse(File.read('./public/data/lti_examples.json'))
      categories = data.map{|d| d['categories'] }.flatten.compact.uniq.sort
      list = {
        :levels => ["K-6th Grade", "7th-12th Grade", "Postsecondary"],
        :categories => categories
      }
      list.to_json
    end
    
    # single app details
    get "/api/v1/apps/:tool_id" do
      host = request.scheme + "://" + request.host_with_port
      return @error unless get_tool
      json_result(fix_tool(@tool, @tool_summary).to_json)
    end
    
    # list all the reviews for an app
    get "/api/v1/apps/:tool_id/reviews" do
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
      result = {
        :meta => {:next => next_url},
        :current_offset => offset,
        :limit => limit,
        :objects => found_reviews.map{|r| review_as_json(r) }
      }
      json_result(result.to_json)
    end
    
    # review an app
    post "/api/v1/apps/:tool_id/reviews" do
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
      json_result(review_as_json(review).to_json)
    end
    
    helpers do
      def sanitize(raw)
        Sanitize.clean(raw)
      end
    
      def apps_list(request, paginated=true)
        host = request.scheme + "://" + request.host_with_port
        limit = 24
        params = request.params
        offset = params['offset'].to_i
        data = JSON.parse(File.read('./public/data/lti_examples.json'))
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
          {
            :meta => {:next => next_url},
            :current_offset => offset,
            :limit => limit,
            :objects => found_data
          }
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

        ['big_image_url', 'image_url', 'icon_url', 'config_url', 'launch_url', 'data_url'].each do |key|
          tool[key] = prepend_host(tool[key], host) if tool[key]
        end
        tool['config_url'] ||= tool['config_urls']
        if tool['data_url'] && tool['icon_url'] && !tool['config_url'] && !tool['config_urls']
          tool['config_url'] = host + "/config/data_tool.xml?id=" + tool['id'] + "&name=" + CGI.escape(tool['name']) + "&icon_url=" + CGI.escape(tool['icon_url']) + "&description=" + CGI.escape(tool['description'])
          tool['extensions'] = ["editor_button", "resource_selection"]
          tool['any_key'] = true
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
        data = JSON.parse(File.read('./public/data/lti_examples.json'))
        @tool = data.detect{|t| t['id'] == id }
        @tool_summary = App.first_or_create(:tool_id => @tool['id'] ) if @tool
        if !@tool
          @error = {:message => "Tool not found", :type => "error"}.to_json
          false
        else
          @tool
        end
      end
    end
    
    # deprecated
    get "/data/lti_examples.jsonp" do
      json = JSON.parse(File.read('./public/data/lti_examples.json')).to_json
      return "#{params['callback'] || 'callback'}(#{json})"
    end
    
    # deprecated
    get "/data/lti_apps.json" do
      return apps_list(request, false).to_json
    end
    
    # deprecated
    get "/data/lti_apps.jsonp" do
      return "#{params['callback'] || 'callback'}(#{apps_list(request, false).to_json})"
    end
    
    get "/data/lti_apps.atom" do
      data = apps_list(request).select{|a| !a['pending'] }
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'application/atom+xml'
      xml = <<-XML
        <?xml version="1.0" encoding="utf-8"?>
         
        <feed xmlns="http://www.w3.org/2005/Atom">
         
                <title>LTI Apps</title>
                <subtitle>A list of known LTI apps</subtitle>
                <link href="#{host}/feed/" rel="self" />
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
  register Apps
end