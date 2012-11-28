RACK_ENV='test'
require 'lti_example'
require 'rspec'
require 'rack/test'
require 'json'

describe 'Tool Redirects' do
  include Rack::Test::Methods
  
  def app
    Sinatra::Application
  end
  
  describe "/tool_redirect" do
    it "should redirect to a local URL" do
      post "/tool_redirect?url=#{CGI.escape("/tools.html")}"
      last_response.should be_redirect
      last_response.location.should == "http://example.org/tools.html?"
    end
    it "should redirect to a remove URL" do
      post "/tool_redirect?url=#{CGI.escape("http://www.example.com/tools.html")}"
      last_response.should be_redirect
      last_response.location.should == "http://www.example.com/tools.html?"
    end
    it "should include expected LTI parameters" do
      # custom_*anything*
      post "/tool_redirect?url=#{CGI.escape("http://www.example.com")}&custom_bob=1"
      last_response.should be_redirect
      last_response.location.should == "http://www.example.com?custom_bob=1"

      # launch_presentation_return_url
      post "/tool_redirect?url=#{CGI.escape("http://www.example.com")}&launch_presentation_return_url=#{CGI.escape("http://www.example.com/return")}"
      last_response.should be_redirect
      last_response.location.should == "http://www.example.com?launch_presentation_return_url=#{CGI.escape("http://www.example.com/return")}"

      # selection_directive
      post "/tool_redirect?url=#{CGI.escape("http://www.example.com")}&selection_directive=do_something"
      last_response.should be_redirect
      last_response.location.should == "http://www.example.com?selection_directive=do_something"

      # all three
      post "/tool_redirect?url=#{CGI.escape("http://www.example.com")}&selection_directive=do_something&launch_presentation_return_url=#{CGI.escape("http://www.example.com/return")}&custom_bob=1"
      last_response.should be_redirect
      uri = URI.parse(last_response.location)
      hash = Rack::Utils.parse_nested_query(uri.query)
      hash['launch_presentation_return_url'].should == "http://www.example.com/return"
      hash['selection_directive'].should == "do_something"
      hash['custom_bob'].should == "1"
    end
    it "should redirect to stored URL if present" do
      # TODO
    end
  end
    
end
