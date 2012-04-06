begin
  require 'rubygems'
rescue LoadError
  puts "You must install rubygems to run this example"
  raise
end

begin
  require 'bundler/setup'
rescue LoadError
  puts "to set up this example, run these commands:"
  puts "  gem install bundler"
  puts "  bundle install"
  raise
end

require 'sinatra'
require 'oauth'
require 'json'
require 'dm-core'
require 'dm-migrations'
require 'nokogiri'
require 'oauth/request_proxy/rack_request'
require 'digest/md5'

# hard-coded oauth information for testing convenience
$oauth_key = "test"
$oauth_secret = "secret"

# sinatra wants to set x-frame-options by default, disable it
disable :protection
# enable sessions so we can remember the launch info between http requests, as
# the user takes the assessment
enable :sessions

class ExternalConfig
  include DataMapper::Resource
  property :id, Serial
  property :config_type, String
  property :value, String
  property :secret, String
end

configure do
  DataMapper.setup(:default, (ENV["DATABASE_URL"] || "sqlite3:///#{Dir.pwd}/development.sqlite3"))
  DataMapper.auto_upgrade!
  @@quizlet_config = ExternalConfig.first(:config_type => 'quizlet')
  @@slideshare_config = ExternalConfig.first(:config_type => 'slideshare')
end

get "/analytics_key.json" do
  config = ExternalConfig.first(:config_type => 'google_analytics')
  return {:key => (config && config.value)}.to_json
end

get "/quizlet_search" do
  return "Quizlet not propertly configured" unless @@quizlet_config
  uri = URI.parse("https://api.quizlet.com/2.0/search/sets")
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  tmp_url = uri.path+"?q=#{params['q']}&client_id=#{@@quizlet_config.value}"
  request = Net::HTTP::Get.new(tmp_url)
  response = http.request(request)
  return response.body
end

get '/slideshare_search' do
  return "Slideshare not properly configured" unless @@slideshare_config
  uri = URI.parse("http://www.slideshare.net/api/2/search_slideshows")
  ts = Time.now.to_i.to_s
  sig = Digest::SHA1.hexdigest(@@slideshare_config.secret + ts)
  http = Net::HTTP.new(uri.host, uri.port)
  tmp_url = uri.path+"?q=#{params['q']}&api_key=#{@@slideshare_config.value}&ts=#{ts}&hash=#{sig}&items_per_page=24&cc=1"
  request = Net::HTTP::Get.new(tmp_url)
  response = http.request(request)
  xml = Nokogiri(response.body)
  res = []
  xml.css('Slideshow').each do |slideshow|
    res << {
      :title => slideshow.css('Title')[0].content,
      :description => slideshow.css('Description')[0].content,
      :url => slideshow.css('URL')[0].content,
      :image_url => slideshow.css('ThumbnailURL')[0].content,
      :embed_code => slideshow.css('Embed')[0].content,
      :author => slideshow.css('Username')[0].content
    }
  end
  return res.to_json
end

get '/wikipedia_search' do
  uri = URI.parse("https://en.wikipedia.org/w/api.php")
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  tmp_url = uri.path + "?action=query&list=search&srsearch=#{CGI.escape(params['q'])}&srprop=snippet&srlimit=21&format=json"
  request = Net::HTTP::Get.new(tmp_url)
  request['User-Agent'] = "LTI-Examples Searcher"
  response = http.request(request)
  res = []
  json = JSON.parse(response.body)
  json['query']['search'].each do |result|
    res << {
      :title => result['title'],
      :description => result['snippet'],
      :url => "http://en.wikipedia.org/wiki/#{result['title']}"
    }
  end
  return res.to_json
end

get "/" do
  if request.host == 'lti-examples.heroku.com' && !request.ssl?
    redirect to('https://lti-examples.heroku.com/index.html') 
  else
    redirect to('/index.html')
  end  
end

# this is the entry action that Canvas (the LTI Tool Consumer) sends the
# browser to when launching the tool.
post "/assessment/start" do
  # first we have to verify the oauth signature, to make sure this isn't an
  # attempt to hack the planet
  begin
    signature = OAuth::Signature.build(request, :consumer_secret => $oauth_secret)
    signature.verify() or raise OAuth::Unauthorized
  rescue OAuth::Signature::UnknownSignatureMethod,
         OAuth::Unauthorized
    return %{unauthorized attempt. make sure you used the consumer key "#{$oauth_key}" and shared secret "#{$oauth_secret}"}
  end

  # make sure this is an assignment tool launch, not another type of launch.
  # only assignment tools support the outcome service, since only they appear
  # in the Canvas gradebook.
  unless params['lis_outcome_service_url'] && params['lis_result_sourcedid']
    return %{It looks like this LTI tool wasn't launched as an assignment, or you are trying to take it as a teacher rather than as a a student. Make sure to set up an external tool assignment as outlined <a target="_blank" href="https://github.com/instructure/lti_example">in the README</a> for this example.}
  end

  # store the relevant parameters from the launch into the user's session, for
  # access during subsequent http requests.
  # note that the name and email might be blank, if the tool wasn't configured
  # in Canvas to provide that private information.
  %w(lis_outcome_service_url lis_result_sourcedid lis_person_name_full lis_person_contact_email_primary).each { |v| session[v] = params[v] }

  # that's it, setup is done. now send them to the assessment!
  redirect to("/assessment")
end

def username
  session['lis_person_name_full'] || 'Student'
end

get "/assessment" do
  # first make sure they got here through a tool launch
  unless session['lis_result_sourcedid']
    return %{You need to take this assessment through Canvas.}
  end

  # now render a simple form the user will submit to "take the quiz"
  <<-HTML
  <html>
    <head>
      <meta charset="utf-8">
      <title>Demo LTI Assessment Tool</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="">
      <meta name="author" content="">
  
      <!-- Le styles -->
      <link href="/bootstrap/css/bootstrap.css" rel="stylesheet">
      <link href="/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
  
      <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
      <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
      <![endif]-->
  
      <!-- Le fav and touch icons -->
      <link rel="shortcut icon" href="/bootstrap/ico/favicon.ico">
      <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/bootstrap/ico/apple-touch-icon-114-precomposed.png">
      <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/bootstrap/ico/apple-touch-icon-72-precomposed.png">
      <link rel="apple-touch-icon-precomposed" href="/bootstrap/ico/apple-touch-icon-57-precomposed.png">
    </head>
    <body>
    <div class="container">
      <div class="hero-unit" style="padding-top: 30px; padding-bottom: 30px;">
        <h1>Pick a Grade!</h1>
      </div>
      <div id="contents">
        <div class='row'>
          <span class='span8 offset2'>
            <form action="/assessment" method="post" class='well'>
              <h2>Hi, #{username}.</h2>
              <p>On a scale of <code>0.0</code> to <code>1.0</code>, how well would you say you did on this assessment?</p>
              <div style="margin: 40px 10px 20px;">
                <input name='score' type='text' class='span1' id='score' placeholder='##' style="height: auto; margin-bottom: auto;"/>
                <input type='submit' value='Submit' class='btn btn-primary'/>
                <p><em>If you want to enter an invalid score here, you can test how the LMS will reject it.</em></p>
              </div>
            </form>
          </span>
        </div>
      </div>
    </div>
    </body>
  </html>
  HTML
end

# This is the action that the form submits to with the score that the student entered.
# In lieu of a real assessment, that score is then just submitted back to Canvas.
post "/assessment" do
  # obviously in a real tool, we're not going to let the user input their own score
  score = params['score']
  if !score || score.empty?
    redirect to("/assessment")
  end

  # now post the score to canvas. Make sure to sign the POST correctly with
  # OAuth 1.0, including the digest of the XML body. Also make sure to set the
  # content-type to application/xml.
  xml = %{
<?xml version = "1.0" encoding = "UTF-8"?>
<imsx_POXEnvelopeRequest xmlns = "http://www.imsglobal.org/lis/oms1p0/pox">
  <imsx_POXHeader>
    <imsx_POXRequestHeaderInfo>
      <imsx_version>V1.0</imsx_version>
      <imsx_messageIdentifier>12341234</imsx_messageIdentifier>
    </imsx_POXRequestHeaderInfo>
  </imsx_POXHeader>
  <imsx_POXBody>
    <replaceResultRequest>
      <resultRecord>
        <sourcedGUID>
          <sourcedId>#{session['lis_result_sourcedid']}</sourcedId>
        </sourcedGUID>
        <result>
          <resultScore>
            <language>en</language>
            <textString>#{score}</textString>
          </resultScore>
        </result>
      </resultRecord>
    </replaceResultRequest>
  </imsx_POXBody>
</imsx_POXEnvelopeRequest>
  }
  consumer = OAuth::Consumer.new($oauth_key, $oauth_secret)
  token = OAuth::AccessToken.new(consumer)
  response = token.post(session['lis_outcome_service_url'], xml, 'Content-Type' => 'application/xml')

  headers 'Content-Type' => 'text'
  %{
  <html>
    <head>
      <meta charset="utf-8">
      <title>Demo LTI Assessment Tool</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="">
      <meta name="author" content="">
  
      <!-- Le styles -->
      <link href="/bootstrap/css/bootstrap.css" rel="stylesheet">
      <link href="/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
  
      <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
      <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
      <![endif]-->
  
      <!-- Le fav and touch icons -->
      <link rel="shortcut icon" href="/bootstrap/ico/favicon.ico">
      <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/bootstrap/ico/apple-touch-icon-114-precomposed.png">
      <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/bootstrap/ico/apple-touch-icon-72-precomposed.png">
      <link rel="apple-touch-icon-precomposed" href="/bootstrap/ico/apple-touch-icon-57-precomposed.png">
    </head>
    <body>
    <div class="container">
      <div class="hero-unit" style="padding-top: 30px; padding-bottom: 30px;">
        <h1>Pick a Grade!</h1>
      </div>
      <div id="contents">
        <div class='row'>
          <span class='span12'>
            <h2>Your score has #{response.body.match(/\bsuccess\b/) ? "been posted" : "failed in posting"} to the LMS.</h2>
            The response was:
              <pre>#{CGI.escapeHTML(response.body)}</pre>
          </span>
        </div>
      </div>
    </div>
    </body>
  </html>
  }
end

post "/titanpad" do
  return "invalid parameters" unless params['context_id'] && params['resource_link_id']
  str = "#{params['context_id']}-#{params['resource_link_id']}"
  redirect to("http://titanpad.com/lti-" + Digest::MD5.hexdigest(str) + "?fullScreen=1&displayName=#{CGI.escape(params['lis_person_name_full'] || '')}")
end

post "/bumpin" do
  return "invalid parameters" unless params['context_id'] && params['resource_link_id']
  str = "#{params['context_id']}-#{params['resource_link_id']}"
  redirect to("/bumpin/room/#{str}?name=#{params['lis_person_name_full']}")
end

get "/bumpin/room/:ids" do
  return <<-HTML
  <html>
  <body>
    <script type="text/javascript" src="http://www.bumpin.com/web_widget/users/swfobject.js"></script>
    <script type="text/javascript" src="http://www.bumpin.com/web_widget/users/bar/jquery-1.3.2.min.js"></script>
    <script type="text/javascript" src="http://www.bumpin.com/new_web_widget/widget.js"></script>
    <div id="bumpin-embedded-div" style="width:800px;"><div id="bumpin-widget"></div><div id="bumpin-link-div">
    <a target="_blank" href="http://www.ticketmy.com/bumpin/index.php">Shoutbox</a>
    </div></div>
    <script>window.onload =function(){loadNewBumpinWidget({ height: "500", width: "800", language: "English", color_string: "", color_theme: "default", enable_login: "false", bumpin_policy: "page", bumpin_url: "", widget_title: "Chat Room", enable_guest_login: "true", show_people_list: "true", enable_sound: "false", nick_name: "#{params['name']}" });}</script>
  </body>
  </html>
HTML
end

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
end

get "/config/course_navigation.xml" do
  host = request.scheme + "://" + request.host_with_port
  headers 'Content-Type' => 'text/xml'
  config_wrap <<-XML
    <blti:title>Course Wanda Fish</blti:title>
    <blti:description>This tool adds a course navigation link to a page on a fish called "Wanda"</blti:description>
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="privacy_level">anonymous</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/graph.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/graph.tk/favicon.png</lticm:property>
        <lticm:property name="text">Embed Graph</lticm:property>
        <lticm:property name="selection_width">740</lticm:property>
        <lticm:property name="selection_height">450</lticm:property>
      </lticm:options>
    </blti:extensions>
    <blti:icon>#{host}/graph.tk/favicon.png</blti:icon>
  XML
end

get "/config/khan_academy.xml" do
  host = request.scheme + "://" + request.host_with_port
  headers 'Content-Type' => 'text/xml'
  config_wrap <<-XML
    <blti:title>Khan Academy Videos</blti:title>
    <blti:description>Search for and insert links to Khan Academy lecture videos.</blti:description>
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="privacy_level">anonymous</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/khan.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/icons/khan.png</lticm:property>
        <lticm:property name="text">Find Khan Academy Video</lticm:property>
        <lticm:property name="selection_width">590</lticm:property>
        <lticm:property name="selection_height">450</lticm:property>
      </lticm:options>
    </blti:extensions>
    <blti:icon>#{host}/icons/khan.png</blti:icon>
  XML
end

get "/config/wikipedia.xml" do
  host = request.scheme + "://" + request.host_with_port
  headers 'Content-Type' => 'text/xml'
  config_wrap <<-XML
    <blti:title>Wikipedia Articles</blti:title>
    <blti:description>Search for and insert links to Wikipedia articles.</blti:description>
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="privacy_level">anonymous</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/wikipedia.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/icons/wikipedia.png</lticm:property>
        <lticm:property name="text">Wikipedia Articles</lticm:property>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="privacy_level">anonymous</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/ted_ed.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/icons/ted_ed.png</lticm:property>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="privacy_level">anonymous</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/youtube.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/icons/youtube.png</lticm:property>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="privacy_level">anonymous</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/quizlet.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/icons/quizlet.png</lticm:property>
        <lticm:property name="text">Embed Quizlet Flash Cards</lticm:property>
        <lticm:property name="selection_width">690</lticm:property>
        <lticm:property name="selection_height">510</lticm:property>
      </lticm:options>
    </blti:extensions>
    <blti:icon>#{host}/icons/quizlet.png</blti:icon>
  XML
end

get "/config/slideshare.xml" do
  host = request.scheme + "://" + request.host_with_port
  headers 'Content-Type' => 'text/xml'
  config_wrap <<-XML
    <blti:title>Slideshare CC Slideshows</blti:title>
    <blti:description>Search for and link to or embed Creative Commons-licensed presentations</blti:description>
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="privacy_level">anonymous</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/slideshare.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/icons/slideshare.png</lticm:property>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="privacy_level">anonymous</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/tools.png</lticm:property>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="privacy_level">anonymous</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/tools.html?tool=merlot')}</lticm:property>
        <lticm:property name="icon_url">#{host}/icons/merlot.png</lticm:property>
        <lticm:property name="text">Merlot</lticm:property>
        <lticm:property name="selection_width">700</lticm:property>
        <lticm:property name="selection_height">550</lticm:property>
      </lticm:options>
    </blti:extensions>
    <blti:icon>#{host}/icons/merlot.png</blti:icon>
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
    <blti:launch_url>#{host}/titanpad</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
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
    <blti:launch_url>#{host}/bumpin</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="privacy_level">anonymous</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/twitter.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/icons/twitter.png</lticm:property>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="privacy_level">anonymous</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/archive.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/archive.png</lticm:property>
        <lticm:property name="text">Internet Archive</lticm:property>
        <lticm:property name="selection_width">690</lticm:property>
        <lticm:property name="selection_height">530</lticm:property>
      </lticm:options>
    </blti:extensions>
    <blti:icon>#{host}/archive.png</blti:icon>
  XML
end

get "/config/piazza.xml" do
  host = request.scheme + "://" + request.host_with_port
  headers 'Content-Type' => 'text/xml'
  xml =  <<-XML
    <blti:title>Piazza</blti:title>
    <blti:description>This tool allows you to add the Piazza discussion tool to your course.</blti:description>
    <blti:launch_url>https://piazza.com/basic_lti</blti:launch_url>
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
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

get "/config/panopto.xml" do
  host = request.scheme + "://" + request.host_with_port
  headers 'Content-Type' => 'text/xml'
  return "domain required" if !params['domain'] || params['domain'] == ''
  xml =  <<-XML
    <blti:title>Panopto</blti:title>
    <blti:description>Panopto is a lecture capture solution</blti:description>
    <blti:launch_url>https://#{params['domain']}.hosted.panopto.com/Panopto/BasicLTI/BasicLTILanding.aspx</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
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

post "/tool_redirect" do
  url = params['url']
  args = []
  params.each do |key, val|
    args << "#{CGI.escape(key)}=#{CGI.escape(val)}" if key.match(/^custom_/) || ['launch_presentation_return_url', 'selection_directive'].include?(key)
  end
  url = url + (url.match(/\?/) ? "&" : "?") + args.join('&')
  redirect to(url)
end

get "/oembed" do
  url = params['url']
  code = CGI.unescape(url.split(/code=/)[1])
  {
    'version' => '1.0',
    'type'    => 'rich',
    'html'    => code,
    'width'   => 600,
    'height'  => 400
  }.to_json
end