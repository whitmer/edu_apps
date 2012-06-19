require 'sinatra/base'

module Sinatra
  module OEmbed
    get "/oembed" do
      url = params['url']
      code = params['code'] || CGI.unescape(url.split(/code=/)[1])
      {
        'version' => '1.0',
        'type'    => 'rich',
        'html'    => code,
        'width'   => 600,
        'height'  => 400
      }.to_json
    end    
  end
  
  register OEmbed
end