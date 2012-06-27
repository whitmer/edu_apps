require 'sinatra/base'

module Sinatra
  module ConfigXML
    def config_wrap(xml)
      res = <<-XML
    <?xml version="1.0" encoding="UTF-8"?>
      <cartridge_basiclti_link xmlns="http://www.imsglobal.org/xsd/imslticc_v1p0"
          xmlns:blti = "http://www.imsglobal.org/xsd/imsbasiclti_v1p0"
          xmlns:lticm ="http://www.imsglobal.org/xsd/imslticm_v1p0"
          xmlns:lticp ="http://www.imsglobal.org/xsd/imslticp_v1p0"
          xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation = "http://www.imsglobal.org/xsd/imslticc_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticc_v1p0.xsd
          http://www.imsglobal.org/xsd/imsbasiclti_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imsbasiclti_v1p0.xsd
          http://www.imsglobal.org/xsd/imslticm_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticm_v1p0.xsd
          http://www.imsglobal.org/xsd/imslticp_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticp_v1p0.xsd">
      XML
      res += xml
      res += <<-XML
          <cartridge_bundle identifierref="BLTI001_Bundle"/>
          <cartridge_icon identifierref="BLTI001_Icon"/>
      </cartridge_basiclti_link>  
      XML
      res.sub(/\A\s+/, '')
    end
    
    get "/config/course_navigation.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Course Wanda Fish</blti:title>
        <blti:description>This tool adds a course navigation link to a page on a fish called "Wanda"</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">course_navigation</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="course_navigation">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/images.html?custom_fish_name=wanda')}</lticm:property>
            <lticm:property name="text">Course Wanda Fish</lticm:property>
          </lticm:options>
        </blti:extensions>
      XML
    end
    
    get "/config/account_navigation.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Account Phil Fish</blti:title>
        <blti:description>This tool adds an account navigation link to a page on a fish named "Phil"</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="account_navigation">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/images.html?custom_fish_name=phil')}</lticm:property>
            <lticm:property name="text">Account Phil Fish</lticm:property>
          </lticm:options>
        </blti:extensions>
      XML
    end
    
    get "/config/user_navigation.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>User Alexander Fish</blti:title>
        <blti:description>This tool adds a user navigation link (in a user's profile) to a page on a fish called "Alexander"</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">account_navigation</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="user_navigation">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/images.html?custom_fish_name=alexander')}</lticm:property>
            <lticm:property name="text">User Alexander Fish</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/fish_icon.png</blti:icon>
      XML
    end
    
    get "/config/grade_passback.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Grade Passback Demo</blti:title>
        <blti:description>This tool demos the LTI Outcomes (grade passback) available as part of LTI</blti:description>
        <blti:launch_url>#{host}/assessment/start</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">grade_passback</lticm:property>
          <lticm:property name="privacy_level">name_only</lticm:property>
        </blti:extensions>
      XML
    end
    
    get "/config/editor_button.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>I Like Fish</blti:title>
        <blti:description>I'm a big fan of fish, and I want to share the love</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">editor_button</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/images.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/fish_icon.png</lticm:property>
            <lticm:property name="text">Pick a Fish</lticm:property>
            <lticm:property name="selection_width">500</lticm:property>
            <lticm:property name="selection_height">300</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/fish_icon.png</blti:icon>
      XML
    end
    
    get "/config/editor_button2.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Placekitten.com</blti:title>
        <blti:description>Placekitten.com is a quick and simple service for adding pictures of kittens to your site</blti:description>
        <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">editor_button2</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/kitten.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/cat_icon.png</lticm:property>
            <lticm:property name="text">Insert a Kitten</lticm:property>
            <lticm:property name="selection_width">500</lticm:property>
            <lticm:property name="selection_height">400</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/cat_icon.png</blti:icon>
      XML
    end
    
    get "/config/resource_selection.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>I Like Fish</blti:title>
        <blti:description>I'm a big fan of fish, and I want to share the love</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">resource_selection</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/name.html')}</lticm:property>
            <lticm:property name="text">Pick a Fish Name</lticm:property>
            <lticm:property name="selection_width">500</lticm:property>
            <lticm:property name="selection_height">300</lticm:property>
          </lticm:options>
        </blti:extensions>
      XML
    end
    
    get "/config/editor_button_and_resource_selection.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>I Like Fish</blti:title>
        <blti:description>I'm a big fan of fish, and I want to share the love</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">editor_button_and_resource_selection</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/images.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/fish_icon.png</lticm:property>
            <lticm:property name="text">Pick a Fish</lticm:property>
            <lticm:property name="selection_width">500</lticm:property>
            <lticm:property name="selection_height">300</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/name.html')}</lticm:property>
            <lticm:property name="text">Pick a Fish Name</lticm:property>
            <lticm:property name="selection_width">500</lticm:property>
            <lticm:property name="selection_height">300</lticm:property>
          </lticm:options>
        </blti:extensions>
      XML
    end
    
    get "/config/inline_graph.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Embeddable Graphs</blti:title>
        <blti:description>This tool allows for the creation and insertion of rich, interactive graphs.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">inline_graph</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/graph.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/graph.tk/favicon.png</lticm:property>
            <lticm:property name="text">Embed Graph</lticm:property>
            <lticm:property name="selection_width">780</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/graph.html')}</lticm:property>
            <lticm:property name="text">Embed Graph</lticm:property>
            <lticm:property name="selection_width">780</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/graph.tk/favicon.png</blti:icon>
      XML
    end
    
    get "/config/data_tool.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>#{params['name']}</blti:title>
        <blti:description>#{params['description']}</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">tool_#{params['id']}</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=' + params['id'])}</lticm:property>
            <lticm:property name="icon_url">#{params['icon_url']}</lticm:property>
            <lticm:property name="text">#{params['name']}</lticm:property>
            <lticm:property name="selection_width">740</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=' + params['id'])}</lticm:property>
            <lticm:property name="text">#{params['name']}</lticm:property>
            <lticm:property name="selection_width">740</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{params['icon_url']}</blti:icon>
      XML
    end
    
    get "/config/khan_academy.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Khan Academy Videos</blti:title>
        <blti:description>Search for and insert links to Khan Academy lecture videos.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">khan_academy</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/khan.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/khan.png</lticm:property>
            <lticm:property name="text">Find Khan Academy Video</lticm:property>
            <lticm:property name="selection_width">590</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/khan.html')}</lticm:property>
            <lticm:property name="text">Find Khan Academy Video</lticm:property>
            <lticm:property name="selection_width">590</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/khan.png</blti:icon>
      XML
    end
    
    get "/config/schooltube.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>SchoolTube Videos</blti:title>
        <blti:description>Search for and insert links to SchoolTube-hosted videos.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">schooltube</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/schooltube.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/schooltube.png</lticm:property>
            <lticm:property name="text">SchoolTube Video</lticm:property>
            <lticm:property name="selection_width">660</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/schooltube.html')}</lticm:property>
            <lticm:property name="text">SchoolTube Video</lticm:property>
            <lticm:property name="selection_width">660</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/schooltube.png</blti:icon>
      XML
    end
    
    get "/config/wikipedia.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Wikipedia Articles</blti:title>
        <blti:description>Search for and insert links to Wikipedia articles.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">wikipedia</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/wikipedia.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/wikipedia.png</lticm:property>
            <lticm:property name="text">Wikipedia Articles</lticm:property>
            <lticm:property name="selection_width">590</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/wikipedia.html')}</lticm:property>
            <lticm:property name="text">Wikipedia Articles</lticm:property>
            <lticm:property name="selection_width">590</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/wikipedia.png</blti:icon>
      XML
    end
    
    get "/config/wiktionary.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Wiktionary Definitions</blti:title>
        <blti:description>Search for and insert definitions from Wiktionary.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">wiktionary</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/wiktionary.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/wikipedia.png</lticm:property>
            <lticm:property name="text">Wiktionary Definitions</lticm:property>
            <lticm:property name="selection_width">590</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/wiktionary.html')}</lticm:property>
            <lticm:property name="text">Wiktionary Definitions</lticm:property>
            <lticm:property name="selection_width">590</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/wikipedia.png</blti:icon>
      XML
    end
    
    get "/config/ted_ed.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>TED Ed Videos</blti:title>
        <blti:description>Search for and insert links to high quality instructional videos from TED Ed.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">ted_ed</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/ted_ed.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/ted_ed.png</lticm:property>
            <lticm:property name="text">TED Ed Video</lticm:property>
            <lticm:property name="selection_width">590</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/ted_ed.html')}</lticm:property>
            <lticm:property name="text">TED Ed Video</lticm:property>
            <lticm:property name="selection_width">590</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/ted_ed.png</blti:icon>
      XML
    end
    get "/config/youtube.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>YouTube Videos</blti:title>
        <blti:description>Search for and insert links to videos hosted on YouTube.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">youtube</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/youtube.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/youtube.png</lticm:property>
            <lticm:property name="text">YouTube Video</lticm:property>
            <lticm:property name="selection_width">590</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/youtube.html')}</lticm:property>
            <lticm:property name="text">YouTube Video</lticm:property>
            <lticm:property name="selection_width">590</lticm:property>
            <lticm:property name="selection_height">450</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/youtube.png</blti:icon>
      XML
    end
    
    
    get "/config/quizlet.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Quizlet Flash Cards</blti:title>
        <blti:description>Search for and insert publicly available flash card sets from quizlet.com</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">quizlet</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/quizlet.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/quizlet.png</lticm:property>
            <lticm:property name="text">Embed Quizlet Flash Cards</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">510</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/quizlet.html')}</lticm:property>
            <lticm:property name="text">Embed Quizlet Flash Cards</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">510</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/quizlet.png</blti:icon>
      XML
    end
    
    get "/config/pinterest.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Pinterest</blti:title>
        <blti:description>Search for images and resources linked to on Pinterest</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">pinterest</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/pinterest.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/pinterest.png</lticm:property>
            <lticm:property name="text">Pinterest</lticm:property>
            <lticm:property name="selection_width">700</lticm:property>
            <lticm:property name="selection_height">510</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/pinterest.html')}</lticm:property>
            <lticm:property name="text">Pinterest</lticm:property>
            <lticm:property name="selection_width">700</lticm:property>
            <lticm:property name="selection_height">510</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/pinterest.png</blti:icon>
      XML
    end
    
    get "/config/slideshare.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Slideshare CC Slideshows</blti:title>
        <blti:description>Search for and link to or embed Creative Commons-licensed presentations</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">slideshare</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/slideshare.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/slideshare.png</lticm:property>
            <lticm:property name="text">Slideshare CC</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">530</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/slideshare.html')}</lticm:property>
            <lticm:property name="text">Slideshare CC</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">530</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/slideshare.png</blti:icon>
      XML
    end
    
    get "/config/tools.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Public Resource Libraries</blti:title>
        <blti:description>Collection of resources from multiple sources, including Kahn Academy, Quizlet, etc.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">tools</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/tools.png</lticm:property>
            <lticm:property name="text">Search Resource Libraries</lticm:property>
            <lticm:property name="selection_width">800</lticm:property>
            <lticm:property name="selection_height">550</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html')}</lticm:property>
            <lticm:property name="text">Search Resource Libraries</lticm:property>
            <lticm:property name="selection_width">800</lticm:property>
            <lticm:property name="selection_height">550</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/tools.png</blti:icon>
      XML
    end
    
    get "/config/merlot.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Merlot</blti:title>
        <blti:description>Collection of multimedia resources collected and curated by MERLOT.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">merlot</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=merlot')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/merlot.png</lticm:property>
            <lticm:property name="text">Merlot</lticm:property>
            <lticm:property name="selection_width">700</lticm:property>
            <lticm:property name="selection_height">550</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=merlot')}</lticm:property>
            <lticm:property name="text">Merlot</lticm:property>
            <lticm:property name="selection_width">700</lticm:property>
            <lticm:property name="selection_height">550</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/merlot.png</blti:icon>
      XML
    end
    
    get "/config/mathalicious.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Mathalicious</blti:title>
        <blti:description>Collection of standards-based math videos based on real-world story problems.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">mathalicious</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=mathalicious')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/mathalicious.png</lticm:property>
            <lticm:property name="text">Mathalicious</lticm:property>
            <lticm:property name="selection_width">700</lticm:property>
            <lticm:property name="selection_height">550</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=mathalicious')}</lticm:property>
            <lticm:property name="text">Mathalicious</lticm:property>
            <lticm:property name="selection_width">700</lticm:property>
            <lticm:property name="selection_height">550</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/mathalicious.png</blti:icon>
      XML
    end
    
    get "/config/ck12.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>CK-12</blti:title>
        <blti:description>Collection of free, open, user-modifiable textbooks for K-12</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">ck12</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=ck12')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/ck12.png</lticm:property>
            <lticm:property name="text">CK-12</lticm:property>
            <lticm:property name="selection_width">700</lticm:property>
            <lticm:property name="selection_height">550</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=ck12')}</lticm:property>
            <lticm:property name="text">CK-12</lticm:property>
            <lticm:property name="selection_width">700</lticm:property>
            <lticm:property name="selection_height">550</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/ck12.png</blti:icon>
      XML
    end
    
    get "/config/smarterer.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Smarterer</blti:title>
        <blti:description>Crowdsources quizzes.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">smarterer</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=smarterer')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/smarterer.png</lticm:property>
            <lticm:property name="text">Smarterer</lticm:property>
            <lticm:property name="selection_width">700</lticm:property>
            <lticm:property name="selection_height">550</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=smarterer')}</lticm:property>
            <lticm:property name="text">Smarterer</lticm:property>
            <lticm:property name="selection_width">700</lticm:property>
            <lticm:property name="selection_height">550</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/smarterer.png</blti:icon>
      XML
    end
    
    get "/config/studyegg.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>StudyEgg</blti:title>
        <blti:description>Dynamic learning paths through open content</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">studyegg</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=studyegg')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/studyegg.png</lticm:property>
            <lticm:property name="text">Smarterer</lticm:property>
            <lticm:property name="selection_width">700</lticm:property>
            <lticm:property name="selection_height">550</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=studyegg')}</lticm:property>
            <lticm:property name="text">Smarterer</lticm:property>
            <lticm:property name="selection_width">700</lticm:property>
            <lticm:property name="selection_height">550</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/studyegg.png</blti:icon>
      XML
    end
    
    get "/config/titanpad.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>TitanPad (adding to modules)</blti:title>
        <blti:description>Allow inserting TitanPad links into modules</blti:description>
        <blti:launch_url>#{host}/titanpad</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">titanpad</lticm:property>
          <lticm:property name="privacy_level">name_only</lticm:property>
        </blti:extensions>
      XML
    end
    
    get "/config/titanpad_course_nav.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>TitanPad (adding to modules)</blti:title>
        <blti:description>Allow inserting TitanPad links into modules</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">titanpad_course_nav</lticm:property>
          <lticm:property name="privacy_level">name_only</lticm:property>
          <lticm:options name="course_navigation">
            <lticm:property name="url">#{host}/titanpad</lticm:property>
            <lticm:property name="text">TitanPad </lticm:property>
          </lticm:options>
        </blti:extensions>
      XML
    end
    
    get "/config/bumpin.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Bumpin</blti:title>
        <blti:description>Add course navigation to allow a Bumpin Social chat room to your courses</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">bumpin</lticm:property>
          <lticm:property name="privacy_level">name_only</lticm:property>
          <lticm:options name="course_navigation">
            <lticm:property name="url">#{host}/bumpin</lticm:property>
            <lticm:property name="text">Bumpin Chat</lticm:property>
          </lticm:options>
        </blti:extensions>
      XML
    end
    
    get "/config/twitter.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Twitter List</blti:title>
        <blti:description>Embed a list of tweets based on search results or a user's profile</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">twitter</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/twitter.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/twitter.png</lticm:property>
            <lticm:property name="text">Twitter List</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">530</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/twitter.html')}</lticm:property>
            <lticm:property name="text">Twitter List</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">530</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/twitter.png</blti:icon>
      XML
    end
    
    get "/config/archive.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Internet Archive</blti:title>
        <blti:description>Search public domain videos, audio files, books, images, etc. on archive.org.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">archive</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/archive.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/archive.png</lticm:property>
            <lticm:property name="text">Internet Archive</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">530</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/archive.html')}</lticm:property>
            <lticm:property name="text">Internet Archive</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">530</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/archive.png</blti:icon>
      XML
    end
    
    get "/config/storify.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Storify</blti:title>
        <blti:description>Search publicly available "social stories" from storify.com</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">storify</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/storify.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/storify.png</lticm:property>
            <lticm:property name="text">Internet Archive</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">530</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/storify.html')}</lticm:property>
            <lticm:property name="text">Internet Archive</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">530</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/storify.png</blti:icon>
      XML
    end
    
    get "/config/ocw_search.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>OCW Search</blti:title>
        <blti:description>Search freely available online university courses and course content</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">ocw_search</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/ocw_search.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/ocw_search.png</lticm:property>
            <lticm:property name="text">OCW Search</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">530</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/ocw_search.html')}</lticm:property>
            <lticm:property name="text">OCW Search</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">530</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/ocw_search.png</blti:icon>
      XML
    end
    
    get "/config/connexions.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Connexions</blti:title>
        <blti:description>Search publicly available courses, modules, etc.</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">connexions</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
          <lticm:options name="editor_button">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/connexions.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/connexions.png</lticm:property>
            <lticm:property name="text">Connexions</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">530</lticm:property>
          </lticm:options>
          <lticm:options name="resource_selection">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/connexions.html')}</lticm:property>
            <lticm:property name="icon_url">#{host}/icons/connexions.png</lticm:property>
            <lticm:property name="text">Connexions</lticm:property>
            <lticm:property name="selection_width">690</lticm:property>
            <lticm:property name="selection_height">530</lticm:property>
          </lticm:options>
        </blti:extensions>
        <blti:icon>#{host}/icons/connexions.png</blti:icon>
      XML
    end
    
    get "/config/piazza.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      xml =  <<-XML
        <blti:title>Piazza</blti:title>
        <blti:description>This tool allows you to add the Piazza discussion tool to your course.</blti:description>
        <blti:launch_url>https://piazza.com/basic_lti</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">piazza</lticm:property>
          <lticm:property name="privacy_level">public</lticm:property>
      XML
      if params['course_nav']
        xml +=  <<-XML
          <lticm:options name="course_navigation">
            <lticm:property name="url">https://piazza.com/basic_lti</lticm:property>
            <lticm:property name="text">Piazza</lticm:property>
          </lticm:options>
        XML
      end
      xml +=  <<-XML
        </blti:extensions>
      XML
      config_wrap(xml)
    end
    
    get "/config/wordpress.xml" do
      host = request.scheme + "://" + request.host_with_port
      return "url required" if !params['site_url'] || params['site_url'] == ''
      headers 'Content-Type' => 'text/xml'
      xml =  <<-XML
        <blti:title>WordPress</blti:title>
        <blti:description>Launch WordPress blogs</blti:description>
        <blti:launch_url>#{params['site_url']}</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">wordpress</lticm:property>
          <lticm:property name="privacy_level">public</lticm:property>
      XML
      if params['course_nav']
        xml +=  <<-XML
          <lticm:options name="course_navigation">
            <lticm:property name="url">#{params['site_url']}</lticm:property>
            <lticm:property name="text">WordPress</lticm:property>
          </lticm:options>
        XML
      end
      xml +=  <<-XML
        <blti:icon>#{host}/icons/wordpress.png</blti:icon>
        </blti:extensions>
      XML
      config_wrap(xml)
    end
    
    get "/config/mahara.xml" do
      host = request.scheme + "://" + request.host_with_port
      return "url required" if !params['site_url'] || params['site_url'] == ''
      headers 'Content-Type' => 'text/xml'
      xml =  <<-XML
        <blti:title>Mahara</blti:title>
        <blti:description>Launch Mahara ePortfolio and Social Networking tool</blti:description>
        <blti:launch_url>#{params['site_url']}</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">mahara</lticm:property>
          <lticm:property name="privacy_level">public</lticm:property>
      XML
      if params['course_nav']
        xml +=  <<-XML
          <lticm:options name="course_navigation">
            <lticm:property name="url">#{params['site_url']}</lticm:property>
            <lticm:property name="text">Mahara</lticm:property>
          </lticm:options>
        XML
      end
      xml +=  <<-XML
        <blti:icon>#{host}/icons/mahara.png</blti:icon>
        </blti:extensions>
      XML
      config_wrap(xml)
    end
    
    get "/config/question2answer.xml" do
      host = request.scheme + "://" + request.host_with_port
      return "url required" if !params['site_url'] || params['site_url'] == ''
      headers 'Content-Type' => 'text/xml'
      xml =  <<-XML
        <blti:title>Question2Answer</blti:title>
        <blti:description>Launch Question2Answer answers site</blti:description>
        <blti:launch_url>#{params['site_url']}</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">question2answer</lticm:property>
          <lticm:property name="privacy_level">public</lticm:property>
      XML
      if params['course_nav']
        xml +=  <<-XML
          <lticm:options name="course_navigation">
            <lticm:property name="url">#{params['site_url']}</lticm:property>
            <lticm:property name="text">Question2Answer</lticm:property>
          </lticm:options>
        XML
      end
      xml +=  <<-XML
        <blti:icon>#{host}/icons/question2answer.png</blti:icon>
        </blti:extensions>
      XML
      config_wrap(xml)
    end
    
    get "/config/panopto.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      return "domain required" if !params['domain'] || params['domain'] == ''
      xml =  <<-XML
        <blti:title>Panopto</blti:title>
        <blti:description>Panopto is a lecture capture solution</blti:description>
        <blti:launch_url>https://#{params['domain']}.hosted.panopto.com/Panopto/BasicLTI/BasicLTILanding.aspx</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">panopto</lticm:property>
          <lticm:property name="privacy_level">public</lticm:property>
      XML
      if params['course_nav']
        xml +=  <<-XML
          <lticm:options name="course_navigation">
            <lticm:property name="url">https://#{params['domain']}.hosted.panopto.com/Panopto/BasicLTI/BasicLTILanding.aspx</lticm:property>
            <lticm:property name="text">Panopto</lticm:property>
          </lticm:options>
        XML
      end
      xml +=  <<-XML
        </blti:extensions>
      XML
      config_wrap(xml)
    end
    
    get "/config/inigral.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      return "app name required" if !params['app_name'] || params['app_name'] == ''
      xml =  <<-XML
        <blti:title>Inigral Schools App</blti:title>
        <blti:description>Schools App is a private social network for your college or university</blti:description>
        <blti:launch_url>#{host}/tool_redirect?url=#{CGI.escape('https://apps.facebook.com/' + params['app_name'])}</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">inigral</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
      XML
      if params['user_nav']
        xml +=  <<-XML
          <lticm:options name="user_navigation">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('https://apps.facebook.com/' + params['app_name'])}</lticm:property>
            <lticm:property name="text">Schools App</lticm:property>
          </lticm:options>
        XML
      end
      xml +=  <<-XML
        <blti:icon>#{host}/icons/inigral.png</blti:icon>
        </blti:extensions>
      XML
      config_wrap(xml)
    end
    
    get "/config/hoot_me.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      return "School Name" if !params['school_name'] || params['school_name'] == ''
      xml =  <<-XML
        <blti:title>Hoot.me</blti:title>
        <blti:description>Launch hoot.me's Facebook study tools</blti:description>
        <blti:launch_url>#{host}/tool_redirect?url=#{CGI.escape('https://app.hoot.me/?status=' + params['school_name'])}</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">hoot_me</lticm:property>
          <lticm:property name="privacy_level">anonymous</lticm:property>
      XML
      if params['user_nav']
        xml +=  <<-XML
          <lticm:options name="user_navigation">
            <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('https://apps.facebook.com/hootapp/?status=' + params['school_name'])}</lticm:property>
            <lticm:property name="text">Hoot.me</lticm:property>
          </lticm:options>
        XML
      end
      xml +=  <<-XML
        <blti:icon>#{host}/icons/hoot_me.png</blti:icon>
        </blti:extensions>
      XML
      config_wrap(xml)
    end
    
    get "/config/cengage.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      config_wrap <<-XML
        <blti:title>Cengage MindLinks</blti:title>
        <blti:description>Build and link to rich interactive learning resources</blti:description>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">cengage</lticm:property>
          <lticm:property name="privacy_level">public</lticm:property>
          <lticm:property name="domain">gateway.cengage.com</lticm:property>
        </blti:extensions>
        <blti:icon>#{host}/icons/cengage.png</blti:icon>
      XML
    end
    
    get "/config/campus_pack.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      return "domain required" if !params['domain'] || params['domain'] == ''
      long_type = "Collaboration Space"
      if params['type'] == 'wiki'
        long_type = 'Wiki'
      elsif params['type'] == 'blog'
        long_type = 'Blog'
      elsif params['type'] == 'journal'
        long_type = 'Journal'
      elsif params['type'] == 'podcast'
        long_type = 'Podcast'
      else
        params['type'] = nil
      end
      xml =  <<-XML
        <blti:title>Campus Pack</blti:title>
        <blti:description>Campus Pack #{long_type} - Learning Objects, Inc.</blti:description>
        <blti:launch_url>https://#{params['domain']}.learningobjects.com/control/lti#{params['type'] && ("?custom_request_type=" + params['type'])}</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">campus_pack</lticm:property>
          <lticm:property name="privacy_level">public</lticm:property>
      XML
      if params['course_nav']
        xml +=  <<-XML
          <lticm:options name="course_navigation">
            <lticm:property name="url">https://#{params['domain']}.learningobjects.com/control/lti#{params['type'] && ("?custom_request_type=" + params['type'])}</lticm:property>
            <lticm:property name="text">#{long_type}</lticm:property>
          </lticm:options>
        XML
      end
      xml +=  <<-XML
        </blti:extensions>
      XML
      config_wrap(xml)
    end
    
    get "/config/noteflight.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      return "domain required" if !params['domain'] || params['domain'] == ''
      xml =  <<-XML
        <blti:title>Noteflight</blti:title>
        <blti:description>Build musical annotations on the web.</blti:description>
        <blti:launch_url>http://#{params['domain']}.noteflight.com/</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">noteflight</lticm:property>
          <lticm:property name="privacy_level">public</lticm:property>
        </blti:extensions>
      XML
      config_wrap(xml)
    end
    
    get "/config/elgg.xml" do
      host = request.scheme + "://" + request.host_with_port
      headers 'Content-Type' => 'text/xml'
      return "domain required" if !params['domain'] || params['domain'] == ''
      xml =  <<-XML
        <blti:title>Elgg</blti:title>
        <blti:description>Elgg is an open source social network</blti:description>
        <blti:launch_url>https://#{params['domain'].sub(/\/$/, '')}/pg/blti/</blti:launch_url>
        <blti:extensions platform="canvas.instructure.com">
          <lticm:property name="tool_id">elgg </lticm:property>
          <lticm:property name="privacy_level">public</lticm:property>
      XML
      if params['course_nav']
        xml +=  <<-XML
          <lticm:options name="course_navigation">
            <lticm:property name="url">https://#{params['domain'].sub(/\/$/, '')}/pg/blti/</lticm:property>
            <lticm:property name="text">Elgg</lticm:property>
          </lticm:options>
        XML
      end
      xml +=  <<-XML
        </blti:extensions>
      XML
      config_wrap(xml)
    end
    
  end 
  register ConfigXML
end