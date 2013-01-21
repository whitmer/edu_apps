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
require 'digest/md5'

if defined?(RACK_ENV)
  set :environment, RACK_ENV
end

require './lib/models'
require './lib/external_search'
require './lib/apps'
require './lib/admin'
require './lib/twitter_login'
require './lib/assessment'
require './lib/custom_launches'
require './lib/config_xml'
require './lib/oembed'

# sinatra wants to set x-frame-options by default, disable it
disable :protection
enable :sessions
# set session key in heroku with: heroku config:add SESSION_KEY=a_longish_secret_key
set(:session_secret, ENV['SESSION_KEY'] || raise "session key required") if ENV['RACK_ENV'] == 'production'

get "/" do
  if request.host == 'lti-examples.heroku.com' && !request.ssl?
    redirect to('https://lti-examples.heroku.com/index.html') 
  else
    redirect to('/index.html')
  end  
end

get "/twitter.html" do
  redirect to("/tools/twitter/index.html")
end

set :views, "./views"

OLD_REDIRECTS = {
  "/twitter.html" => 'twitter', # no params
  "/twitter.html?" => 'twitter', # no params
  "/wolfram.html" => 'wolfram', # no params
  "/ted_ed.html" => 'ted_ed', # no params
  "/graph.html" => 'graph_builder', # no params
  "/archive.html" => 'archive', # no params
  "/usatoday.html" => 'usa_today', # no params
  "/nytimes.html" => 'nytimes', # no params
  "/schooltube.html" => 'schooltube', # no params
  "/slideshare.html" => 'slideshare', # no params
  "/quizlet.html" => 'quizlet', # no params
  "/khan.html" => 'khan_academy', # no params
  "/wikipedia.html" => 'wikipedia', # no params
  "/gooru.html" => 'gooru', # no params
  "/wiktionary.html" => 'wiktionary', # no params
  "/kitten.html" => 'place_kitten',
  "/storify.html" => 'storify', # no params
  "/ocw_search.html" => 'ocw_search', # no params
  "/youtube.html" => 'youtube', # no params
  "/youtube_edu.html" => 'youtube_edu', # no params
  "/youtube_user.html" => 'youtube_user', # no params
  "/pinterest.html" => 'pinterest', # no params
  "/tools.html" => 'public_collections', # no params
  "/connexions.html" => 'connexions', # no params
}
post "/tool_redirect" do
  tool_redirect
end

get "/tool_redirect" do
  tool_redirect
end

def tool_redirect
  url = params['url']
  
  # figure out the tool id, if there is one
  id = params['id'] || (url && OLD_REDIRECTS[url]) || (url && OLD_REDIRECTS[url.split(/\?/)[0]])
  
  # include any arguments passed through the old-school URL
  args = []
  if url
    uri = URI.parse(url)
    Rack::Utils.parse_nested_query(uri.query).each do |key, value|
      args << "#{CGI.escape(key)}=#{CGI.escape(value)}"
    end
  end

  # set to the new tool URL if it matches as a tool  
  url = "/tools/#{id}/index.html" if id
  
  # include the required arguments and any query string parameters
  params.each do |key, val|
    args << "#{CGI.escape(key)}=#{CGI.escape(val)}" if key.match(/^custom_/) || ['launch_presentation_return_url', 'selection_directive'].include?(key) || (key != 'url' && key != 'id' && request.GET[key])
  end
  
  # key is used to remember the launch, this is used for standard LTI launches which make you
  # pick the resource after the first tool launch.
  key = "#{params['resource_link_id']}_" + Digest::MD5.hexdigest("#{params['context_id']}-#{params['tool_consumer_instance_guid']}-#{params['tool_consumer_info_product_family_code']}")[0, 5] if params['resource_link_id'] && params['tool_consumer_instance_guid']
  if key
    session[key] = true
    args << "key=#{key}"
  end
  lr = key && LaunchRedirect.first(:token => key)
  
  # if a URL has been remembered for a standard LTI launch, direct the user there
  if lr && lr.url
    lr.last_launched_at = Time.now
    lr.launches = (lr.launches || 0) + 1
    lr.save
    if request.get?
      return "Remembered redirect to <a href='#{lr.url}'>#{lr.url}</a>"
    else
      redirect to(lr.url)
    end
  else
    pre_hash, post_hash = url.split(/#/)
    
    url = pre_hash + (url.match(/\?/) ? "&" : "?") + args.uniq.join('&') + (post_hash ? "##{post_hash}" : "")
    if request.get?
      return "Redirect to <a href='#{url}'>#{url}</a>"
    else
      redirect to(url)
    end
  end
end

post "/tool_remember" do
  if params['key'] && session[params['key']]
    lr = LaunchRedirect.first_or_new(:token => params['key'])
    lr.created_at ||= Time.now
    lr.url = params['url']
    lr.save
    {:success => true, :id => lr.id, :key => lr.token, :url => lr.url}.to_json
  else
    {:success => false}.to_json
  end
end

get "/oembed_render" do
  html = "<html><body>"
  endpoint = params[:endpoint]
  url = params[:url]
  uri = URI.parse(endpoint + (endpoint.match(/\?/) ? '&url=' : '?url=') + CGI.escape(url) + '&format=json')
  res = Net::HTTP.get(uri) rescue "{}"
  data = JSON.parse(res) rescue {}
  if data['type']
    if data['type'] == 'photo' && data['url'] && data['url'].match(/^http/)
      html += "<img src='#{data['url']}' alt='#{data['title']}'/>"
    elsif data['type'] == 'link' && data['url'] && data['url'].match(/^(http|https|mailto)/)
      html += "<a href='#{data['url']}'>#{data['title']}</a>"
    elsif data['type'] == 'video' || data['type'] == 'rich'
      html += data['html']
    end
  else
    html += "<p>There was a problem retrieving this resource. The external tool provided invalid information about the resource.</p>"
  end
  html += "</body></html>"
  html
end

get "/suggestions" do
  suggestions_config = ExternalConfig.first(:config_type => 'suggestions_form')
  if !suggestions_config
    redirect to("/index.html")
  else
    redirect to("/suggestions.html?url=#{CGI.escape(suggestions_config.value)}")
  end
end

get "/analytics_key.json" do
  config = ExternalConfig.first(:config_type => 'google_analytics')
  return {:key => (config && config.value)}.to_json
end

def add_script(src)
  @scripts ||= []
  @scripts << src
end

def more_scripts
  @scripts ||= []
  @scripts.map{|s| "<script src='#{s}'></script>" }.join("\n")
end