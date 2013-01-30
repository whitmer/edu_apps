require File.dirname(__FILE__) + '/spec_helper'

describe 'Apps API' do
  include Rack::Test::Methods
  
  def app
    Sinatra::Application
  end
    
  before(:each) do
    App.create(:pending => true, :tool_id => 'pending_app', :settings => {'id' => 'pending_app'})
    AdminPermission.create(:username => '@bob', :apps => 'any')
    AdminPermission.create(:username => '@fred', :apps => 'book,twitter')
    AdminPermission.create(:username => '@sam', :apps => 'book,paper')
  end
  
  describe "admin permissions" do
    it "should not allow unsigned users to access /admin" do
      get "/admin"
      last_response.should be_ok
      last_response.body.should == "No"
    end
    
    it "should not allow signed unapproved users to access /admin" do
      get "/admin", {}, 'rack.session' => {'user_key' => 'fred'}
      last_response.should be_ok
      last_response.body.should == "No"
    end
    
    it "should allow approved admins to access /admin" do
      get "/admin", {}, 'rack.session' => {'user_key' => 'bob'}
      last_response.should be_ok
      last_response.body.should match(/admin/i)
    end
    
    it "should allow global admins to update apps" do
      put "/api/v1/apps/twitter", {}, 'rack.session' => {'user_key' => 'bob'}
      last_response.should be_ok
      last_response.body.should_not == "No"
    end
    
    it "should allow permission-matching users to update apps" do
      put "/api/v1/apps/twitter", {}, 'rack.session' => {'user_key' => 'fred'}
      last_response.should be_ok
      last_response.body.should_not == "No"
    end
    
    it "should not allow non-permitted users to update apps" do
      put "/api/v1/apps/twitter", {}, 'rack.session' => {'user_key' => 'sam'}
      last_response.should be_ok
      last_response.body.should == "No"
    end
    
    it "should not allow unsigned users to update apps" do
      put "/api/v1/apps/twitter", {}, 'rack.session' => {'user_key' => 'alice'}
      last_response.should be_ok
      last_response.body.should == "No"
    end
    
    it "should not allow unsigned users to propose new apps" do
      post "/api/v1/apps", {}
      last_response.should be_ok
      last_response.body.should == "No"
    end
    
    it "should not allow signed users to propose existing apps" do
      App.create(:tool_id => 'twitter')
      post "/api/v1/apps", {'id' => 'twitter'}, 'rack.session' => {'user_key' => 'sam'}
      last_response.should be_ok
      last_response.body.should match(/already exists/)
    end
    
    it "should allow signed users to propose new apps" do
      post "/api/v1/apps", {'id' => 'squint'}, 'rack.session' => {'user_key' => 'bob'}
      last_response.should be_ok
      last_response.body.should_not == "No"

      post "/api/v1/apps", {'id' => 'paper'}, 'rack.session' => {'user_key' => 'filian'}
      last_response.should be_ok
      last_response.body.should_not == "No"
    end
    
    describe "pending app list" do
      it "should filter by pending for admins" do
        get '/api/v1/apps?pending=1', {}, 'rack.session' => {'user_key' => 'bob'}
        last_response.should be_ok
        json = JSON.parse(last_response.body)
        json['objects'].should_not be_nil
        json['objects'].length.should > 0
      end
      
      it "should not filter by pending for non-admins" do
        get '/api/v1/apps?pending=1'
        last_response.should be_ok
        json = JSON.parse(last_response.body)
        json['objects'].should_not be_nil
        json['objects'].length.should == 0
      end
    end
    
    describe "pending app details" do
      it "should not allow seeing pending apps for non-admins" do
        get '/api/v1/apps/pending_app'
        last_response.should be_ok
        last_response.body.should match(/not found/)
      end
      
      it "should allow seeing pending apps for admins" do
        get '/api/v1/apps/pending_app', {}, 'rack.session' => {'user_key' => 'bob'}
        last_response.should be_ok
        last_response.body.should match(/pending/)
      end
      
      it "should not allow admins to check pending app configs" do
        app = JSON.parse(File.read('./public/data/lti_examples.json')).select{|a| !a['pending'] }[0]
        app['pending'] = true
        App.build_or_update(app['id'], app, true)
        get "/tools/#{app['id']}/config.xml"
        last_response.should be_ok
        last_response.body.should == "App not found"

        get "/tools/no_tool/config.xml", {}
        last_response.should be_ok
        last_response.body.should == "App not found"
      end
      
      it "should allow admins to check pending app configs" do
        app = JSON.parse(File.read('./public/data/lti_examples.json')).select{|a| !a['pending'] }[0]
        app['pending'] = true
        App.build_or_update(app['id'], app, true)
        get "/tools/#{app['id']}/config.xml", {}, 'rack.session' => {'user_key' => 'bob'}
        last_response.should be_ok
        last_response.body.should_not == "No"

        get "/tools/no_tool/config.xml", {}, 'rack.session' => {'user_key' => 'bob'}
        last_response.should be_ok
        last_response.body.should == "App not found"
      end
    
    end
  end
end
