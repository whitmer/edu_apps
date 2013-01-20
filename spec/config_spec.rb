require File.dirname(__FILE__) + '/spec_helper'

describe 'Config Redirects' do
  include Rack::Test::Methods
  
  def app
    Sinatra::Application
  end
  
  describe "config xml renders/redirects" do
    @apps = JSON.parse(File.read('./public/data/lti_examples.json')).select{|a| !a['pending'] }
    @apps.each do |app|
      describe app['name'] do
        it "should not fail" do
          get "/tools/#{app['id']}/config.xml"
          if app['config_xml']
            last_response.should be_redirect
            last_response.location.should == app['config_xml']
          elsif app['config_options'] && app['config_options'].any?{|o| o['required'] }
            last_response.should be_ok
            last_response.body.should match(/Missing required value/)
            
            args = []
            app['config_options'].each{|o| args << "#{o['name']}=#{CGI.escape(o['value'].to_s || "junk")}" }
            get "/tools/#{app['id']}/config.xml?" + args.join("&")
            last_response.should be_ok
            last_response.body.should match(/blti/)
          else
            last_response.should be_ok
            last_response.body.should match(/blti/)
          end
            
        end
      end
    end
    
    ["/config/course_navigation.xml",
    "/config/account_navigation.xml",
    "/config/user_navigation.xml",
    "/config/grade_passback.xml",
    "/config/editor_button.xml",
    "/config/editor_button2.xml",
    "/config/resource_selection.xml",
    "/config/editor_button_and_resource_selection.xml"].each do |path|
      describe path do
        it "should not fail" do
          get path
          last_response.should be_ok
          last_response.body.should match(/blti/)
        end
      end
    end
  end
    
end
