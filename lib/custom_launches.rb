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
  end 
  register CustomLaunches
end