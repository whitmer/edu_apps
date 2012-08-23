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

if defined?(RACK_ENV)
  set :environment, RACK_ENV
end

require './lib/models'
require './lib/external_search'
require './lib/apps'
require './lib/twitter_login'
require './lib/assessment'
require './lib/custom_launches'
require './lib/config_xml'
require './lib/oembed'

# sinatra wants to set x-frame-options by default, disable it
disable :protection
# enable sessions so we can remember  launch info between http requests, as
# the user takes assessments
enable :sessions


get "/" do
  if request.host == 'lti-examples.heroku.com' && !request.ssl?
    redirect to('https://lti-examples.heroku.com/index.html') 
  else
    redirect to('/index.html')
  end  
end

post "/tool_redirect" do
  url = params['url']
  args = []
  params.each do |key, val|
    args << "#{CGI.escape(key)}=#{CGI.escape(val)}" if key.match(/^custom_/) || ['launch_presentation_return_url', 'selection_directive'].include?(key)
  end
  pre_hash, post_hash = url.split(/#/)
  url = pre_hash + (url.match(/\?/) ? "&" : "?") + args.join('&') + (post_hash ? "##{post_hash}" : "")
  redirect to(url)
end

get "/tool_redirect" do
  redirect to("/")
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

get "/analytics_key.json" do
  config = ExternalConfig.first(:config_type => 'google_analytics')
  return {:key => (config && config.value)}.to_json
end
