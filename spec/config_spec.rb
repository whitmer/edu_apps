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
        before(:each) do
          App.build_or_update(app['id'], app, true)
        end
        
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
          if(app['app_type'] == 'open_launch' || app['app_type'] == 'data') 
            xml = Nokogiri(last_response.body)
            xml.css('blti|launch_url').should_not be_empty
            xml.css('blti|launch_url')[0].text.should == "http://example.org/tool_redirect?id=#{app['id']}"
            if app['extensions'] && app['extensions'].include?('editor_button')
              xml.css("lticm|options[name='editor_button']").should_not be_empty
              xml.css("lticm|options[name='editor_button']")[0].css("lticm|property[name='url']").text.should == "http://example.org/tool_redirect?id=#{app['id']}"
            end
            if app['extensions'] && app['extensions'].include?('resource_selection')
              xml.css("lticm|options[name='resource_selection']").should_not be_empty
              xml.css("lticm|options[name='resource_selection']")[0].css("lticm|property[name='url']").text.should == "http://example.org/tool_redirect?id=#{app['id']}"
            end
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
