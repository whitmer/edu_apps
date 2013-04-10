require File.dirname(__FILE__) + '/spec_helper'

describe 'Apps API' do
  include Rack::Test::Methods
  
  def app
    LtiExample
  end
  
  def check_app_response(app)
    ['logo_url', 'icon_url', 'banner_url', 'description', 'name', 'comments_count', 'ratings_count'].each do |key|
      app[key].should_not be_nil
    end
  end
  
  before(:each) do
    populate_apps
  end
  
  describe "apps index" do
    it "should return list of apps" do
      get '/api/v1/apps'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['meta'].should_not be_nil
      json['objects'].should_not be_nil
      json['objects'].length.should == 24
      json['meta']['next'].should == "http://example.org/api/v1/apps?offset=24"
      json['objects'].  each do |obj|
        check_app_response(obj)
      end
    end
    
    it "should filter by level" do
      get '/api/v1/apps?level=K-6th%20Grade'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['meta'].should_not be_nil
      json['objects'].should_not be_nil
      json['objects'].length.should > 0
      json['objects'].  each do |obj|
        obj['levels'].should be_include('K-6th Grade')
        check_app_response(obj)
      end
      
      get '/api/v1/apps?level=Bad+List'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['objects'].length.should == 0
    end
    
    it "should filter by category" do
      get '/api/v1/apps?category=Math'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['meta'].should_not be_nil
      json['objects'].should_not be_nil
      json['objects'].length.should > 0
      json['objects'].  each do |obj|
        obj['categories'].should be_include('Math')
        check_app_response(obj)
      end
      
      get '/api/v1/apps?category=Bad+List'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['objects'].length.should == 0
    end
    
    it "should filter by extensions" do
      get '/api/v1/apps?extension=editor_button'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['meta'].should_not be_nil
      json['objects'].should_not be_nil
      json['objects'].length.should > 0
      json['objects'].  each do |obj|
        obj['extensions'].should be_include('editor_button')
        check_app_response(obj)
      end
      
      get '/api/v1/apps?extension=Bad+Extension'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['objects'].length.should == 0
    end
    
    it "should filter by recency" do
      get '/api/v1/apps?recent=1'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['meta'].should_not be_nil
      json['objects'] = json['objects'].map{|o| {'added' => o['added']} }
      json['objects'].should_not be_nil
      json['objects'].length.should > 0
      json['objects'].sort{|a, b| b['added'] <=> a['added'] }.should == json['objects']
    end
    
    it "should filter by platform" do
      get '/api/v1/apps?platform=Canvas'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['meta'].should_not be_nil
      json['objects'].should_not be_nil
      json['objects'].length.should > 0
      json['objects'].  each do |obj|
        check_app_response(obj)
      end
      
      get '/api/v1/apps?extension=Bobs+LMS'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['objects'].  each do |obj|
        obj['extensions'].should be_nil
        check_app_response(obj)
      end
    end
    
    it "should not include explicitly filtered-out apps" do
      id = App.load_apps[0]['id']
      filter = AppFilter.create(:code => 'abc', :settings => {'app_ids' => {id => false}})
      get '/api/v1/apps?filter=abc'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['objects'].detect{|o| o['id'] == id}.should == nil
    end
    
    it "should include explicitly allowed apps" do
      id = App.load_apps[0]['id']
      filter = AppFilter.create(:code => 'abc', :settings => {'app_ids' => {id => true}})
      get '/api/v1/apps?filter=abc'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['objects'].detect{|o| o['id'] == id}.should_not == nil
    end
    
    it "should not include unconfigured apps if not allowed" do
      id = App.load_apps[0]['id']
      filter = AppFilter.create(:code => 'abc', :settings => {'app_ids' => {}, 'allow_new' => false})
      get '/api/v1/apps?filter=abc'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['objects'].detect{|o| o['id'] == id}.should == nil
    end
    
    it "should include unconfigured apps if allowed" do
      id = App.load_apps[0]['id']
      filter = AppFilter.create(:code => 'abc', :settings => {'app_ids' => {}, 'allow_new' => true})
      get '/api/v1/apps?filter=abc'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['objects'].detect{|o| o['id'] == id}.should_not == nil
    end
    
    it "should include filter on pagination url" do
      id = App.load_apps[0]['id']
      filter = AppFilter.create(:code => 'abc', :settings => {'app_ids' => {}, 'allow_new' => true})
      get '/api/v1/apps?filter=abc'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['meta']['next'].should match(/filter=abc/)
    end
  end
  
  describe "app details" do
    it "should return app details" do
      get '/api/v1/apps/twitter'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['id'].should == 'twitter'
      json['name'].should == "Twitter"
      check_app_response(json)
    end
    
    it "should return app comments summaries" do
      a = App.first_or_new(:tool_id => 'twitter')
      a.tool_id = 'twitter'
      a.avg_rating = 1.2
      a.ratings_count = 12
      a.comments_count = 6
      a.save!
      get '/api/v1/apps/twitter'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['id'].should == 'twitter'
      json['name'].should == "Twitter"
      json['avg_rating'].should == 1.2
      json['ratings_count'].should == 12
      json['comments_count'].should == 6
      check_app_response(json)
    end
    
    it "should return app details for data_url apps" do
      get '/api/v1/apps/mit_ocw'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['id'].should == 'mit_ocw'
      check_app_response(json)
    end
  end
  
  describe "app categories" do
    it "should return app categories" do
      get '/api/v1/app_categories'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['levels'].should == ["K-6th Grade", "7th-12th Grade", "Postsecondary"]
      json['categories'].should be_include('Content')
      json['categories'].should be_include('Community')
      json['categories'].should be_include('Media')
      json['categories'].should be_include('Web 2.0')
    end
  end
  
  describe "app filter create" do
    it "should require a logged-in user" do
      post "/api/v1/filter", {}
      last_response.should_not be_ok
      JSON.parse(last_response.body).should == {'error' => 'Not logged in'}
    end
    
    it "should create filter on success" do
      post "/api/v1/filter", {'app_ids' => []}, 'rack.session' => {'user_key' => 'bob'}
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['allow_new'].should == false
      json['app_ids']['twitter'].should == false

      post "/api/v1/filter", {'app_ids' => ['twitter'], 'allow_new' => '1'}, 'rack.session' => {'user_key' => 'bob'}
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['allow_new'].should == true
      json['app_ids']['twitter'].should == true
      json['app_ids']['youtube'].should == false
    end
  end
  
  describe "app reviews" do
    it "should return an empty list if there are no reviews" do
      AppReview.all.destroy
      get '/api/v1/apps/twitter/reviews'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['meta']['next'].should == nil
      json['objects'].length.should == 0
    end
    
    it "should return reviews if there are any" do
      AppReview.all.destroy

      t = ExternalAccessToken.new
      t.name = "external site"
      t.site_url = "http://example.com/site"
      t.active = true
      t.save!
      a = App.first_or_new(:tool_id => 'twitter')
      a.tool_id = 'twitter'
      a.save!
      r = AppReview.new
      r.tool_id = a.tool_id
      r.tool_name = "tool name"
      r.user_name = "user name"
      r.user_url = "http://example.com/user_url"
      r.user_avatar_url = "http://example.com/avatar_url"
      r.user_id = "user_id"
      r.external_access_token_id = t.id
      r.created_at = Time.now
      r.rating = 4
      r.comments = nil
      r.save!

      get '/api/v1/apps/twitter/reviews'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['meta']['next'].should == nil
      json['objects'].length.should == 0
      
      r.comments = "my comments"
      r.save!
      get '/api/v1/apps/twitter/reviews'
      last_response.should be_ok
      json = JSON.parse(last_response.body)
      json['meta']['next'].should == nil
      json['objects'].length.should == 1
      review = json['objects'][0]
      review['user_name'].should == r.user_name
      review['user_url'].should == r.user_url
      review['user_avatar_url'].should == r.user_avatar_url
      review['tool_name'].should == r.tool_name
      review['rating'].should == r.rating
      review['comments'].should == r.comments
      review['source_name'].should == t.name
      review['source_url'].should == t.site_url
    end
  end
  
  describe "app post review" do
    it "should not fail" do
      app_review
      get "/data/app_reviews.atom"
      last_response.should be_ok
      last_response.body.should match(/LTI App Reviews/)
      xml = Nokogiri(last_response.body)
      xml.css('entry').length.should == 1
    end
  end
  
  describe "app atom feed" do
    it "should not fail" do
      get "/data/lti_apps.atom"
      last_response.should be_ok
      last_response.body.should match(/LTI Apps/)
      xml = Nokogiri(last_response.body)
      xml.css('entry').length.should > 0
    end
    
  end
  
  describe "app review feed" do
  end
end

#     post "/api/v1/apps/:tool_id/reviews" do