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
require 'lib/models'
require 'lib/external_search'
require 'lib/apps'
require 'lib/twitter_login'
require 'lib/assessment'
require 'lib/custom_launches'
require 'lib/config_xml'
require 'lib/oembed'

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

get "/analytics_key.json" do
  config = ExternalConfig.first(:config_type => 'google_analytics')
  return {:key => (config && config.value)}.to_json
end
