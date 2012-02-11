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
require 'oauth/request_proxy/rack_request'

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
end

configure do
  DataMapper.setup(:default, (ENV["DATABASE_URL"] || "sqlite3:///#{Dir.pwd}/development.sqlite3"))
  DataMapper.auto_upgrade!
  @@quizlet_config = ExternalConfig.first(:config_type => 'quizlet')
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
    return %{unauthorized attempt. make sure you used the consumer secret "#{$oauth_secret}"}
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
    <head><title>Demo LTI Assessment Tool</title></head>
    <body>
      <h1>Demo LTI Assessment Tool</h1>
      <form action="/assessment" method="post">
        <p>Hi, #{username}. On a scale of <code>0.0</code> to <code>1.0</code>, how well would you say you did on this assessment?</p>
        <input name='score' type='text' width='5' id='score' />
        <input type='submit' value='Submit' />
        <p>If you want to enter an invalid score here, you can see how Canvas will reject it.</p>
      </form>
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
Your score has #{response.body.match(/\bsuccess\b/) ? "been posted" : "failed in posting"} to Canvas. The response was:

#{response.body}
  }
end

get "/" do
  <<-HTML
  <html>
    <head>
      <title>LTI Examples</title>
      <style>
      body {
        width: 700px;
        margin: 0 auto;
      }
      ul li {
        clear: both;
      }
      ul li > div {
        padding: 5px 0 15px 20px;
      }
      ul li > div img {
        width: 250px;
        float: right;
        padding-right: 10px;
        padding-bottom: 20px;
      }
      </style>
    </head>
    <body>
      <h1>LTI Examples</h1>
      
      <p>
        This repo contains working examples of LTI integrations, including
        LTI extensions as documented in the 
        <a href="https://canvas.instructure.com/doc/api/tools_intro.html">Canvas API docs</a>.
        The source code is freely available as
        <a href="https://github.com/instructure/lti_example">a github repository</a>
        and can be run locally or easily deployed to a public environment.
      </p>
      <p>
        If you are unfamiliar with LTI (or Basic LTI), please check out the 
        <a href="http://www.imsglobal.org/lti/">IMS LTI documentation</a>
      </p>
      <h2>Configuring Tools in Canvas</h2>
      <img src="/tool_config.png" style="width: 300px; float: right;" alt=""/>
      <p>LTI tool configuration in Canvas can happen on the course or account.
      Click the "Settings" link in the left sidebar of the course or account
      where you want to add the tool. Click the "External Tools" tab and click
      "Add External Tool".
      </p>
      <p>Enter the name, consumer key and shared secret for the
      tool (for these demo tools you can put any key and secret that you like).
      For "configuration type" select "By URL" and paste in the full URL of the
      link configuration (copy the URL from one of the links below).
      </p>
      <p>After the tool is saved you should see it appear as configured in the
      course our account content.</p>
      <h2>Default Configurations</h2>
      <p>These are basic XML configurations for LTI tools with extensions. You
      can copy and paste these URLs as standard configuration, or try modifying
      the configuration XML to set up more advanced configurations. More information
      on tool configuration is availabe in the <a href="https://canvas.instructure.com/doc/api/tools_intro.html">Canvas API docs</a></p>
      <ul>
        <li><a href="/config/course_navigation.xml">Course Navigation Demo</a>
          <div>
            <img src="/course_navigation_example.png" alt=""/>
            This is an example of a standard configuration for adding a link to
            course navigation. This link is available to anyone with access to 
            the course. If it's configured at the account level, the link will
            be added to all courses within that account.
            <a href="https://canvas.instructure.com/doc/api/navigation_tools.html#course_navigation">more information</a>
          </div>
        </li>
        <li><a href="/config/account_navigation.xml">Account Navigation Demo</a>
          <div>
            <img src="/account_navigation_example.png" alt=""/>
            This is an example of a standard configuration for adding a link to
            account navigation. This link is available to anyone with access to 
            the account. The link will appear in the current account and any
            sub-accounts of that account.
            <a href="https://canvas.instructure.com/doc/api/navigation_tools.html#account_navigation">more information</a>
          </div>
        </li>
        <li><a href="/config/user_navigation.xml">User Navigation Demo</a>
          <div>
            <img src="/user_navigation_example.png" alt=""/>
            This is an example of a standard configuration for adding a link to
            user navigation. This link is available to anyone with access to 
            the institution, and will appear whent hey click the profile link.
            <a href="https://canvas.instructure.com/doc/api/navigation_tools.html#user_navigation">more information</a>
          </div>
        </li>
        <li><a href="/config/grade_passback.xml">Grade Passback (LTI Outcomes) Demo</a>
          <div>
            This example showcases the LTI Outcomes functionality which is
            part of LTI 1.1. After this tool is configured, create a new assignment
            with type "External Tool". Select the configured tool and then
            access the assignment as a student to test its functionality.
            <a href="https://canvas.instructure.com/doc/api/assignment_tools.html">more information</a>
          </div>
        </li>
        <li><a href="/config/editor_button.xml">Rich Editor Button Demo</a>
          <div>
            <img src="/editor_button_example.png" alt=""/>
            This shows adding an editor button to the rich editor
            in course/group content. Clicking the new fish icon will pop up a dialog
            with pictures of fish. Clicking any of the fish will insert that
            image into the rich content pane. If the tool is configured at the account
            level, then the button will appear for any courses/groups within 
            that account.
            <a href="https://canvas.instructure.com/doc/api/editor_button_tools.html">more information</a>
          </div>
        </li>
        <li><a href="/config/editor_button2.xml">Another Rich Editor Button Demo</a>
          <div>
            <img src="/kitten_example.png" alt=""/>
            This shows adding an editor button to the rich editor
            in course/group content. Clicking the new kitten icon will pop up a dialog
            that uses placekitten.com to generate an image of a kitten set
            to the user's specified dimensions. If the tool is configured at the account
            level, then the button will appear for any courses/groups within 
            that account.
            <a href="https://canvas.instructure.com/doc/api/editor_button_tools.html">more information</a>
          </div>
        </li>
        <li><a href="/config/resource_selection.xml">Links in Modules Demo</a>
          <div>
            <img src="/resource_selection_example.png" alt=""/>
            This tool allows the user to pick and insert custom content as link
            in course modules. When inserting content into a module, if the user
            picks "External Tools" they'll see the configured tool with a "find"
            icon. Clicking the tool will bring up a new dialog where the user
            can pick/build content (in this case creating a page that shows an
            image of a fish with a user-specified name for the fish) 
            to be inserted as a page or resource within
            the current module. If the tool is configured at the account level,
            then it will be available for any courses within that account.
            <a href="https://canvas.instructure.com/doc/api/link_selection_tools.html">more information</a>
          </div>
        </li>
        <li><a href="/config/editor_button_and_resource_selection.xml">Combination Rich Editor Button and Module Links Demo</a>
          <div>
            This example shows configuring a tool to serve multiple purposes at
            the same time. In this case, a single tool can add both a fish 
            icon to the rich editor, and the ability to add named fish pages to
            course modules.
            <a href="https://canvas.instructure.com/doc/api/tools_xml.html">more information about advanced configuration</a>
          </div>
        </li>
        <li><a href="/config/inline_graph.xml">Inline Graphs Demo</a>
          <div>
            <img src="/graph_tk_example.png" alt=""/>
            This is a real-world example that allows users to insert rich,
            interactive graphs into course content. Users can type in arbitrary
            equations (similar to the Canvas equation editor) and see them
            rendered in the graph. They can then position the graph and click
            to insert it into the page.
            <a href="https://github.com/aantthony/graph.tk">more information about graph.tk</a>
          </div>
        </li>
        <li><a href="/config/khan_academy.xml">Khan Academy Videos Demo</a>
          <div>
            <img src="/khan_academy_example.png" alt=""/>
            This is a real-world example that allows users to search through
            the list of Khan Academy videos and embed links to these videos
            directly into course material.
            <a href="http://www.khanacademy.com">more information about Khan Academy</a>
          </div>
        </li>
      </ul>
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
      <lticm:property name="privacy_level">public</lticm:property>
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
      <lticm:property name="privacy_level">public</lticm:property>
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
      <lticm:property name="privacy_level">public</lticm:property>
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
      <lticm:property name="privacy_level">public</lticm:property>
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
      <lticm:property name="privacy_level">public</lticm:property>
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
      <lticm:property name="privacy_level">public</lticm:property>
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
      <lticm:property name="privacy_level">public</lticm:property>
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
      <lticm:property name="privacy_level">public</lticm:property>
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
      <lticm:property name="privacy_level">public</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/graph.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/graph.tk/favicon.ico</lticm:property>
        <lticm:property name="text">Embed Graph</lticm:property>
        <lticm:property name="selection_width">740</lticm:property>
        <lticm:property name="selection_height">450</lticm:property>
      </lticm:options>
    </blti:extensions>
    <blti:icon>#{host}/graph.tk/favicon.ico</blti:icon>
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
      <lticm:property name="privacy_level">public</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/khan.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/khan.ico</lticm:property>
        <lticm:property name="text">Find Khan Academy Video</lticm:property>
        <lticm:property name="selection_width">590</lticm:property>
        <lticm:property name="selection_height">450</lticm:property>
      </lticm:options>
    </blti:extensions>
    <blti:icon>#{host}/khan.ico</blti:icon>
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
      <lticm:property name="privacy_level">public</lticm:property>
      <lticm:options name="editor_button">
        <lticm:property name="url">#{host}/tool_redirect?url=#{CGI.escape('/quizlet.html')}</lticm:property>
        <lticm:property name="icon_url">#{host}/quizlet.ico</lticm:property>
        <lticm:property name="text">Embed Quizlet Flash Cards</lticm:property>
        <lticm:property name="selection_width">690</lticm:property>
        <lticm:property name="selection_height">510</lticm:property>
      </lticm:options>
    </blti:extensions>
    <blti:icon>#{host}/khan.ico</blti:icon>
  XML
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
