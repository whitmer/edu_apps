require 'sinatra/base'
require 'digest/md5'

module Sinatra
  module CustomLaunches
    post "/titanpad" do
      return "invalid parameters" unless params['context_id'] && params['resource_link_id']
      str = "#{params['context_id']}-#{params['resource_link_id']}"
      redirect to("http://titanpad.com/lti-" + Digest::MD5.hexdigest(str) + "?fullScreen=1&displayName=#{CGI.escape(params['lis_person_name_full'] || '')}")
    end
    
    post "/speeqe" do
      return "invalid parameters" unless params['context_id'] && params['resource_link_id']
      str = Digest::MD5.hexdigest("#{params['context_id']}-#{params['resource_link_id']}")[0, 20]
      redirect to("http://#{str}.speeqe.com")
    end
    
    get "/speeqe" do
      redirect to("http://lti-demo.speeqe.com")
    end
    
    get "/data_stream" do
      uri = URI.parse("https://api.quizlet.com/2.0/search/sets")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = uri.ssl?
      tmp_url = uri.path + "?" + uri.query
      request = Net::HTTP::Get.new(tmp_url)
      response = http.request(request)
    end
  end 
  register CustomLaunches
end