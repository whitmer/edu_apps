require 'sinatra/base'

module Sinatra
  module ConfigXML
    
    # Catchall
    get "/tools/:tool_id/config.xml" do
      load_app(params['tool_id'])
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
    
    # The following routes are *mostly* just for backwards compatibility
    get "/config/inline_graph.xml" do
      open_launch(:graph_builder)
    end
    
    get "/config/data_tool.xml" do
      data_launch params['id']
    end
    
    get "/config/khan_academy.xml" do
      open_launch(:khan_academy)
    end
    
    get "/config/schooltube.xml" do
      open_launch(:schooltube)
    end
    
    get "/config/wikipedia.xml" do
      open_launch(:wikipedia)
    end
    
    get "/config/wiktionary.xml" do
      # TODO: fix for non-embed tools
      open_launch :wiktionary
    end
    
    get "/config/ted_ed.xml" do
      open_launch :ted_ed
    end
    
    get "/config/youtube.xml" do
      open_launch :youtube
    end
    
    get "/config/youtube_upload.xml" do
      open_launch :youtube_upload
    end
    
    get "/config/youtube_user.xml" do
      config_launch :youtube_user
    end
    
    get "/config/youtube_edu.xml" do
      open_launch :youtube_edu
    end
    
    get "/config/quizlet.xml" do
      open_launch :quizlet
    end
    
    get "/config/pinterest.xml" do
      open_launch :pinterest
    end
    
    get "/config/slideshare.xml" do
      open_launch :slideshare
    end
    
    get "/config/tools.xml" do
      open_launch :public_collections
    end
    
    get "/config/gooru.xml" do
      open_launch :gooru
    end
    
    get "/config/titanpad.xml" do
      config_launch :titanpad
    end
    
    get "/config/speeqe.xml" do
      config_launch :speeqe
    end
    
    get "/config/twitter.xml" do
      open_launch :twitter
    end
    
    get "/config/wolfram.xml" do
      open_launch :wolfram
    end
    
    get "/config/archive.xml" do
      open_launch :archive
    end
    
    get "/config/usa_today.xml" do
      open_launch :usa_today
    end
    
    get "/config/nytimes.xml" do
      open_launch :nytimes
    end
    
    get "/config/storify.xml" do
      open_launch :storify
    end
    
    get "/config/ocw_search.xml" do
      open_launch :ocw_search
    end
    
    get "/config/connexions.xml" do
      open_launch :connexions
    end
    
    get "/config/piazza.xml" do
      config_launch :piazza
    end
    
    get "/config/redirect.xml" do
      config_launch :redirect
    end
    
    get "/config/wordpress.xml" do
      config_launch :wordpress
    end
    
    get "/config/status_net.xml" do
      config_launch :status_net
    end
    
    get "/config/vanilla.xml" do
      config_launch :vanilla
    end
    
    get "/config/question_mark.xml" do
      config_launch :question_mark
    end
    
    get "/config/web_pa.xml" do
      config_launch :web_pa
    end
    
    get "/config/mahara.xml" do
      config_launch :mahara
    end
    
    get "/config/question2answer.xml" do
      config_launch :question2answer
    end
    
    get "/config/panopto.xml" do
      config_launch :panopto
    end
    
    get "/config/inigral.xml" do
      config_launch :inigral
    end
    
    get "/config/hoot_me.xml" do
      config_launch :hoot_me
    end
    
    get "/config/cengage.xml" do
      config_launch :cengage
    end
    
    get "/config/campus_pack.xml" do
      custom_launch :campus_pack
    end
    
    get "/config/bb_collaborate.xml" do
      custom_launch :bb_collaborate
    end
    
    get "/config/noteflight.xml" do
      config_launch :noteflight
    end
    
    get "/config/plato.xml" do
      config_launch :plato
    end
    
    get "/config/elgg.xml" do
      config_launch :elgg
    end
    
    get "/config/drupal.xml" do
      custom_launch :drupal
    end
    
    # Configuration Examples
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