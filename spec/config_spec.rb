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
    
    describe "data json redirects" do
      it "should return stored json" do
        App.create(:tool_id => 'tool', :pending => false, :settings => {'id' => 'tool', 'description' => '', 'data_json' => [{}, {}]})
        get "/tools/tool/data.json"
        last_response.should be_ok
        last_response.body.should == [{}, {}].to_json
      end
      it "should redirect to external json" do
        App.create(:tool_id => 'tool', :pending => false, :settings => {'id' => 'tool', 'description' => '', 'data_url' => "http://www.example.com"})
        get "/tools/tool/data.json"
        last_response.should be_redirect
        last_response.location.should == "http://www.example.com"
      end
      it "should return empty set if no json" do
        App.create(:tool_id => 'tool', :pending => false, :settings => {'id' => 'tool', 'description' => ''})
        get "/tools/tool/data.json"
        last_response.should be_ok
        last_response.body.should == [].to_json
      end
    end
    
    describe "image redirects" do
      it "should redirect logo requests" do
        App.create(:tool_id => 'tool', :pending => false, :settings => {'id' => 'tool', 'description' => '', 'logo_url' => 'http://www.example.com/logo.png'})
        get "/tools/tool/logo.png"
        last_response.should be_redirect
        last_response.location.should == "http://www.example.com/logo.png"
      end
      it "should error if no logo url present" do
        App.create(:tool_id => 'tool', :pending => false, :settings => {'id' => 'tool', 'description' => ''})
        get "/tools/tool/logo.png"
        last_response.should be_ok
        last_response.body.should == "Not Found"
      end
      it "should redirect banner requests" do
        App.create(:tool_id => 'tool', :pending => false, :settings => {'id' => 'tool', 'description' => '', 'banner_url' => 'http://www.example.com/banner.png'})
        get "/tools/tool/banner.png"
        last_response.should be_redirect
        last_response.location.should == "http://www.example.com/banner.png"
      end
      it "should error if no banner url present" do
        App.create(:tool_id => 'tool', :pending => false, :settings => {'id' => 'tool', 'description' => ''})
        get "/tools/tool/banner.png"
        last_response.should be_ok
        last_response.body.should == "Not Found"
      end
      it "should redirect icon requests" do
        App.create(:tool_id => 'tool', :pending => false, :settings => {'id' => 'tool', 'description' => '', 'icon_url' => 'http://www.example.com/icon.png'})
        get "/tools/tool/icon.png"
        last_response.should be_redirect
        last_response.location.should == "http://www.example.com/icon.png"
      end
      it "should error if no icon url present" do
        App.create(:tool_id => 'tool', :pending => false, :settings => {'id' => 'tool', 'description' => ''})
        get "/tools/tool/icon.png"
        last_response.should be_ok
        last_response.body.should == "Not Found"
      end
    end
  end
    
end
