require 'sinatra/base'

module Sinatra
  module ConfigXML
    
    # Catchall
    get "/tools/:tool_id/config.xml" do
      app_config(params['tool_id'])
    end
    
    get "/tools/:tool_id/data.json" do
      load_app(params['tool_id'])
      if @app['data_json']
        @app['data_json']
      elsif @app['data_url']
        redirect to(@app['data_url'])
      else
        [].to_json
      end
    end
    
    # Fallbacks if images are stored elsewhere
    get "/tools/:tool_id/icon.png" do
      load_app(params['tool_id'])
      halt "Not Found" unless @app && @app['icon_url']
      redirect to @app['icon_url']
    end
    
    get "/tools/:tool_id/logo.png" do
      load_app(params['tool_id'])
      halt "Not Found" unless @app && @app['logo_url']
      redirect to @app['logo_url']
    end
    
    get "/tools/:tool_id/banner.png" do
      load_app(params['tool_id'])
      halt "Not Found" unless @app && @app['banner_url']
      redirect to @app['banner_url']
    end
    
    # The following routes are just for backwards compatibility
    get "/config/inline_graph.xml" do
      app_config(:graph_builder)
    end
    
    get "/config/data_tool.xml" do
      app_config params['id']
    end
    
    get "/config/khan_academy.xml" do
      app_config(:khan_academy)
    end
    
    get "/config/schooltube.xml" do
      app_config(:schooltube)
    end
    
    get "/config/wikipedia.xml" do
      app_config(:wikipedia)
    end
    
    get "/config/wiktionary.xml" do
      # TODO: fix for non-embed tools
      app_config :wiktionary
    end
    
    get "/config/ted_ed.xml" do
      app_config :ted_ed
    end
    
    get "/config/youtube.xml" do
      app_config :youtube
    end
    
    get "/config/youtube_upload.xml" do
      app_config :youtube_upload
    end
    
    get "/config/youtube_user.xml" do
      app_config :youtube_user
    end
    
    get "/config/youtube_edu.xml" do
      app_config :youtube_edu
    end
    
    get "/config/quizlet.xml" do
      app_config :quizlet
    end
    
    get "/config/pinterest.xml" do
      app_config :pinterest
    end
    
    get "/config/slideshare.xml" do
      app_config :slideshare
    end
    
    get "/config/tools.xml" do
      app_config :public_collections
    end
    
    get "/config/gooru.xml" do
      app_config :gooru
    end
    
    get "/config/titanpad.xml" do
      app_config :titanpad
    end
    
    get "/config/speeqe.xml" do
      app_config :speeqe
    end
    
    get "/config/twitter.xml" do
      app_config :twitter
    end
    
    get "/config/wolfram.xml" do
      app_config :wolfram
    end
    
    get "/config/archive.xml" do
      app_config :archive
    end
    
    get "/config/usa_today.xml" do
      app_config :usa_today
    end
    
    get "/config/nytimes.xml" do
      app_config :nytimes
    end
    
    get "/config/storify.xml" do
      app_config :storify
    end
    
    get "/config/ocw_search.xml" do
      app_config :ocw_search
    end
    
    get "/config/connexions.xml" do
      app_config :connexions
    end
    
    get "/config/piazza.xml" do
      app_config :piazza
    end
    
    get "/config/redirect.xml" do
      app_config :redirect
    end
    
    get "/config/wordpress.xml" do
      app_config :wordpress
    end
    
    get "/config/status_net.xml" do
      app_config :status_net
    end
    
    get "/config/vanilla.xml" do
      app_config :vanilla
    end
    
    get "/config/question_mark.xml" do
      app_config :question_mark
    end
    
    get "/config/web_pa.xml" do
      app_config :web_pa
    end
    
    get "/config/mahara.xml" do
      app_config :mahara
    end
    
    get "/config/question2answer.xml" do
      app_config :question2answer
    end
    
    get "/config/panopto.xml" do
      app_config :panopto
    end
    
    get "/config/inigral.xml" do
      app_config :inigral
    end
    
    get "/config/hoot_me.xml" do
      app_config :hoot_me
    end
    
    get "/config/cengage.xml" do
      app_config :cengage
    end
    
    get "/config/campus_pack.xml" do
      app_config :campus_pack
    end
    
    get "/config/bb_collaborate.xml" do
      app_config :bb_collaborate
    end
    
    get "/config/noteflight.xml" do
      app_config :noteflight
    end
    
    get "/config/plato.xml" do
      app_config :plato
    end
    
    get "/config/elgg.xml" do
      app_config :elgg
    end
    
    get "/config/drupal.xml" do
      app_config :drupal
    end
    
    # Configuration Examples (not just for backwards compatibility)
    get "/config/course_navigation.xml" do
      headers 'Content-Type' => 'text/xml'
      erb :"examples/course_navigation", :layout => :xml_layout
    end
    
    get "/config/account_navigation.xml" do
      headers 'Content-Type' => 'text/xml'
      erb :"examples/account_navigation", :layout => :xml_layout
    end
    
    get "/config/user_navigation.xml" do
      headers 'Content-Type' => 'text/xml'
      erb :"examples/user_navigation", :layout => :xml_layout
    end
    
    get "/config/grade_passback.xml" do
      headers 'Content-Type' => 'text/xml'
      erb :"examples/grade_passback", :layout => :xml_layout
    end
    
    get "/config/editor_button.xml" do
      headers 'Content-Type' => 'text/xml'
      erb :"examples/editor_button", :layout => :xml_layout
    end
    
    get "/config/editor_button2.xml" do
      headers 'Content-Type' => 'text/xml'
      erb :"examples/editor_button2", :layout => :xml_layout
    end
    
    get "/config/resource_selection.xml" do
      headers 'Content-Type' => 'text/xml'
      erb :"examples/resource_selection", :layout => :xml_layout
    end
    
    get "/config/editor_button_and_resource_selection.xml" do
      headers 'Content-Type' => 'text/xml'
      erb :"examples/editor_button_and_resource_selection", :layout => :xml_layout
    end
    
    helpers do
      def host
        request.scheme + "://" + request.host_with_port
      end
      
      def app_config(id)
        load_app(id)
        return "App not found" if !@app
        (@app['config_options'] || []).each do |args|
          key = args['name']
          if args['required'] && !params[key] || params[key] == ''
            return "Missing required value: #{args['description']}"
          end
        end
        @opts = XmlConfigParser.config_options(@app, params, host)
        headers 'Content-Type' => 'text/xml'
        erb :lti_xml, :layout => false
      end
      
      def load_app(id)
        return if @app && @app['id'] == id.to_s
        @app = App.load_apps.detect{|a| a['id'] == id.to_s }
        if admin?(id) && !@app
          a = App.first(:tool_id => id )
          @app = a && a.settings
        end
        return unless @app
        @id = id
        @app_name = @app['name']
        @app_desc = @app['short_description'] || @app['description'].split("<br/>")[0]
      end
      
    end
    
  end 
  register ConfigXML
end