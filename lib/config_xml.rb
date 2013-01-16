require 'sinatra/base'

module Sinatra
  module ConfigXML
    
    # Catchall
    get "/tools/:tool_id/config.xml" do
      app_config(params['tool_id'])
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
        @opts = App.config_options(@app, params, host)
        headers 'Content-Type' => 'text/xml'
        erb :lti_xml, :layout => false
      end
      
      def load_app(id)
        return if @app && @app['id'] == id.to_s
        @app = JSON.parse(File.read('./public/data/lti_examples.json')).detect{|a| a['id'] == id.to_s }
        @id = id
        @app_name = app['name']
        @app_desc = app['short_description'] || app['description'].split("<br/>")[0]
      end
      
      def data_launch(id)
        headers 'Content-Type' => 'text/xml'
        load_app(id)
        @width = 740
        @height = 450
        @link_name = @name
        erb :"data_launch", :layout => :xml_layout
      end
      
      def open_launch(id, args={})
        headers 'Content-Type' => 'text/xml'
        load_app(id)
        @width = @app['width'] || 700
        @height = @app['height'] || 400
        @link_name = @app['link_name'] || @name
        @no_launch = @app['launch'] == false
        erb :"open_launch", :layout => :xml_layout
      end
      
      def config_launch(id)
        load_app(id)
        required_params = (@app['config_options'] || []).select{|o| o['required'] }.map{|o| o['name'] }
        required_params.each do |param|
          return "#{param} required" if !params[param] || params[param] == ''
        end
        headers 'Content-Type' => 'text/xml'
        erb "tools/#{id}/config".to_sym, :layout => :xml_layout
      end
      
      def custom_launch(id)
        headers 'Content-Type' => 'text/xml'
        erb :"tools/#{id}/config", :layout => :xml_layout
      end
    end
    
  end 
  register ConfigXML
end