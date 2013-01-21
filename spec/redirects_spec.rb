require File.dirname(__FILE__) + '/spec_helper'

describe 'Tool Redirects' do
  include Rack::Test::Methods
  
  def app
    Sinatra::Application
  end
  
  describe "/tool_redirect" do
    it "should redirect to a local URL" do
      post "/tool_redirect?url=#{CGI.escape("/tools.html")}"
      last_response.should be_redirect
      last_response.location.should == "http://example.org/tools/public_collections/index.html?"
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
    it "should redirect to new URL if changed" do
      post "/tool_redirect?url=#{CGI.escape("/wikipedia.html")}&launch_presentation_return_url=#{CGI.escape("http://www.example.com/return")}"
      last_response.should be_redirect
      uri = URI.parse(last_response.location)
      uri.path.should == "/tools/wikipedia/index.html"
    end
    it "should redirect to open launch apps" do
      post "/tool_redirect?id=twitter&launch_presentation_return_url=#{CGI.escape("http://www.example.com/return")}"
      last_response.should be_redirect
      uri = URI.parse(last_response.location)
      uri.path.should == "/tools/twitter/index.html"
    end
    
    it "should redirect to data launch apps" do
      post "/tool_redirect?id=brainpop&launch_presentation_return_url=#{CGI.escape("http://www.example.com/return")}"
      last_response.should be_redirect
      uri = URI.parse(last_response.location)
      uri.path.should == "/tools/public_collections/index.html"
      hash = Rack::Utils.parse_nested_query(uri.query)
      hash['tool'].should == "brainpop"
    end
    
    it "should not redirect to unknown apps" do
      post "/tool_redirect?id=not_an_app&launch_presentation_return_url=#{CGI.escape("http://www.example.com/return")}"
      last_response.should_not be_redirect
      last_response.body.should == "Not found"
    end
    
    it "should redirect to stored URL if present" do
      # TODO
    end
  end
    
end
