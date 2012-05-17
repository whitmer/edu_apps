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

get "/storify_search" do
  url = "http://api.storify.com/v1/stories/browse/popular?per_page=21"
  if params['sort'] == 'latest'
    if !params['q'] || params['q'].empty?
      url = "http://api.storify.com/v1/stories/browse/latest?per_page=21"
    else
      url = "http://api.storify.com/v1/stories/search?q=#{CGI.escape(params['q'])}&per_page=21"
    end
  else
    if !params['q'] || params['q'].empty?
      url = "http://api.storify.com/v1/stories/browse/featured?per_page=21"
    else
      url = "http://api.storify.com/v1/stories/search?q=#{CGI.escape(params['q'])}&sort=stats.views&per_page=21"
    end
  end
  uri = URI.parse(url)
  response = Net::HTTP.get(uri)
  json = JSON.parse(response)
  return json['content']['stories'].to_json
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

get '/pinterest_search' do
  uri = URI.parse("https://api.pinterest.com/v2/popular/?limit=30")
  path = uri.path
  if params['q'] && !params['q'].empty?
    uri = URI.parse("https://api.pinterest.com/v2/search/pins/")
    path = uri.path+"?query=#{CGI.escape(params['q'])}&limit=30"
  end
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  request = Net::HTTP::Get.new(path)
  response = http.request(request)
  return response.body
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

get '/cnx_search' do
  uri = URI.parse("http://cnx.org/content/opensearch?words=#{CGI.escape(params['q'])}&b_size=12")
  xml = Nokogiri(Net::HTTP.get(uri))
  res = []
  xml.css('item').each do |item|
    res << {
      :title => item.css('title')[0].content,
      :description => item.css('description')[0].content,
      :url => item.css('link')[0].content
    }
  end
  return res.to_json
end

get '/ocw_search' do
  uri = URI.parse("http://www.ocwsearch.com/api/v1/search.json?q=#{CGI.escape(params['q'])}&contact=#{CGI.escape('http://www.instructure.com')}")
  json = JSON.parse(Net::HTTP.get(uri))
  res = []
  json['Results'].to_a.sort_by{|k, v| k.to_i }.each do |k, result|
    next unless result['Title']
    res << {
      :title => result['Title'],
      :description => result['Description'],
      :url => result['CourseURL']
    }
  end
  return res.to_json
end

get "/wiktionary_search" do
  url = "http://en.wiktionary.org/wiki/#{params['q']}"
  uri = URI.parse(url)
  html = Nokogiri::HTML(Net::HTTP.get(uri))
  categories = html.css('ol')
  res = []
  categories.each do |cat|
    type = nil
    lang = nil
    head = cat.previous
    while head && !head.name.match(/^h\d/)
      head = head.previous
    end
    type = head
    while head && head.name != 'h2'
      head = head.previous
    end
    lang = head
    if type && type.css('.mw-headline').length > 0 && lang && lang.css('#English').length > 0
      type_text = type.css('.mw-headline')[0].text
      if type_text != 'References'
        res << {:type => type_text, :definitions => []}
        cat.children.each do |li|
          li.css('ul,dl').each(&:remove)
          res[-1][:definitions] << li.text.strip unless li.text.strip.empty?
        end
      end
    end
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

get "/data/lti_examples.jsonp" do
  json = JSON.parse(File.read('./public/data/lti_examples.json')).to_json
  return "#{params['callback'] || 'callback'}(#{json})"
end

def apps_list(request)
  host = request.scheme + "://" + request.host_with_port
  data = JSON.parse(File.read('./public/data/lti_examples.json'))
  data.each do |tool|
    ['big_image_url', 'image_url', 'icon_url', 'config_url', 'launch_url', 'data_url'].each do |key|
      tool[key] = prepend_host(tool[key], host) if tool[key]
    end
    if tool['data_url'] && tool['icon_url']
      tool['config_url'] = "/config/data_tool.xml?id=" + tool['id'] + "&name=" + CGI.escape(tool['name']) + "&icon_url=" + CGI.escape(tool['icon_url']) + "&description=" + CGI.escape(tool['description'])
      tool['any_key'] = true
    end
  end
  data
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
  
get "/data/lti_apps.jsonp" do
  return "#{params['callback'] || 'callback'}(#{apps_list(request).to_json})"
end

get "/data/lti_apps.json" do
  return apps_list(request).to_json
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="tool_id">inline_graph</lticm:property>
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

get "/config/data_tool.xml" do
  host = request.scheme + "://" + request.host_with_port
  headers 'Content-Type' => 'text/xml'
  config_wrap <<-XML
    <blti:title>#{params['name']}</blti:title>
    <blti:description>#{params['description']}</blti:description>
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
      <lticm:property name="tool_id">ted_ed</lticm:property>
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
      <lticm:property name="tool_id">youtube</lticm:property>
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
      <lticm:property name="tool_id">quizlet</lticm:property>
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

get "/config/pinterest.xml" do
  host = request.scheme + "://" + request.host_with_port
  headers 'Content-Type' => 'text/xml'
  config_wrap <<-XML
    <blti:title>Pinterest</blti:title>
    <blti:description>Search for images and resources linked to on Pinterest</blti:description>
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
      <lticm:property name="tool_id">tools</lticm:property>
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
      <lticm:property name="tool_id">merlot</lticm:property>
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

get "/config/mathalicious.xml" do
  host = request.scheme + "://" + request.host_with_port
  headers 'Content-Type' => 'text/xml'
  config_wrap <<-XML
    <blti:title>Mathalicious</blti:title>
    <blti:description>Collection of standards-based math videos based on real-world story problems.</blti:description>
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/titanpad</blti:launch_url>
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
    <blti:launch_url>#{host}/bumpin</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
      <lticm:property name="tool_id">archive</lticm:property>
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

get "/config/storify.xml" do
  host = request.scheme + "://" + request.host_with_port
  headers 'Content-Type' => 'text/xml'
  config_wrap <<-XML
    <blti:title>Storify</blti:title>
    <blti:description>Search publicly available "social stories" from storify.com</blti:description>
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect?url=#{CGI.escape('https://apps.facebook.com/hootapp/?status=' + params['school_name'])}</blti:launch_url>
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
    <blti:launch_url>#{host}/tool_redirect</blti:launch_url>
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