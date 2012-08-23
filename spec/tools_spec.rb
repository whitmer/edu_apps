RACK_ENV='test'
require 'lti_example'
require 'capybara'
require 'capybara/dsl'
require 'rspec'
require 'rack/test'
require 'json'


Capybara.app = Sinatra::Application

RSpec.configure do |config|
  config.include Capybara::DSL
end

describe 'Tools Selenium' do
  include Rack::Test::Methods
  include Capybara::DSL
  Capybara.default_driver = :selenium
  
  def app
    Sinatra::Application
  end
  
  def keep_trying_until(&block)
    i = 0
    while i < 10
      res = yield
      return if res
      puts "trying #{i}..."
      sleep 1
      i += 1
    end
    raise "lameness"
  end
  
  def visit_tool(path)
    visit path
    keep_trying_until{ page.has_selector?('#header img') }
    page.should have_selector('#header img')
    page.should have_selector('h1')
  end
  
  def check_embed_result(embed_type, regex)
    if embed_type == :oembed
      all('.insertion textarea').length.should == 0
      all('.insertion p').length.should == 1
      all('.insertion')[0]['data-endpoint'].should match(/\/oembed/)
      all('.insertion')[0]['data-url'].should match(regex)
    else
      embed_lookups = {
        :link => /^<a/,
        :iframe => /^<iframe/
      }
      all('.insertion textarea').length.should > 0
      all('.insertion textarea')[0][:value].should match(embed_lookups[embed_type])
      all('.insertion textarea')[0][:value].should match(regex)
    end
  end
  
  def check_default_results
    all('#results .result').length.should > 5
  end
  
  describe "/tools.html" do
    it "shoud load" do
      visit_tool '/tools.html'
      keep_trying_until{ all('#tools .tool').length > 20 }
      all('#tools .tool').length.should > 20
      fill_in('query', :with => 'codec')
      all('#tools .tool').length.should < 20
      find("#query").set('')
      find("#search button").click
      all('#tools .tool').length.should > 20
      find("#tools .tool").click
      page.should have_selector('#back')
      find("#back").click
      keep_trying_until{ all('#tools .tool').length > 20 }
      all('#tools .tool').length.should > 20
    end
  end
  
  describe "/archive.html" do
    it "should load" do
      visit_tool '/archive.html'
      fill_in('query', :with => 'man')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      find("#results .result .title").text.should match(/man/i)
      find("#results .result").click
      check_embed_result(:link, /archive\.org/)
    end
  end
  
  describe "/graph.html" do
    it "should load" do
      visit '/graph.html'
      page.should have_selector('iframe')
    end
  end
  
  describe "/khan.html" do
    it "should load" do
      visit_tool '/khan.html'
      youtube_test
    end
  end
  
  describe "/ocw_search.html" do
    it "should load" do
      visit_tool '/ocw_search.html'
      fill_in('query', :with => '11.948 mit')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      find("#results .result .title").text.should match(/11\.948/i)
      find("#results .result").click
      check_embed_result(:link, /ocw\.mit\.edu/)
    end
  end
  
  describe "/quizlet.html" do
    # needs an api token
    it "should load" do
      ExternalConfig.first(:config_type => 'quizlet').should_not be_nil
      visit_tool '/quizlet.html'
      fill_in('query', :with => 'car')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      find("#results .result .title").text.should match(/car/i)
      find("#results .result").click
      find("#quizlet_preview")[:src].should match(/quizlet\.com/)
      find("#quizlet_preview")[:src].should match(/familiarize/)
      page.select('Learn', :from => 'quizlet_type')
      find("#quizlet_preview")[:src].should match(/quizlet\.com/)
      find("#quizlet_preview")[:src].should match(/learn/)
      page.select('Scatter Game', :from => 'quizlet_type')
      find("#quizlet_preview")[:src].should match(/quizlet\.com/)
      find("#quizlet_preview")[:src].should match(/scatter/)
      find("#add").click
      
      check_embed_result(:iframe, /quizlet\.com/)
    end
  end
  
  describe "/schooltube.html" do
    it "should load" do
      visit_tool '/schooltube.html'
      check_default_results
      fill_in('query', :with => 'biology')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      find("#results .result .title").text.should match(/biology/i)
      find("#results .result").click
      check_embed_result(:link, /bit\.ly/)
    end
  end
  
  describe "/slideshare.html" do
    it "should load" do
      ExternalConfig.first(:config_type => 'slideshare').should_not be_nil
      visit_tool '/slideshare.html'
      fill_in('query', :with => 'bacon')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      find("#results .result .title").text.should match(/bacon/i)
      find("#results .result").click
      find("#slideshare_wrapper object").should_not be_nil
      find("#link").click
      check_embed_result(:link, /slideshare\.net/)
    end
  end
  
  describe "/storify.html" do
    it "should load" do
      visit_tool '/storify.html'
      keep_trying_until{ all('#results .result').length > 5 }
      page.select('Latest', :from => 'type')
      keep_trying_until{ all('#results .result').length > 5 }
      fill_in('query', :with => 'love')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      find("#results .result").click
      check_embed_result(:link, /storify\.com/)
    end
  end
  
  describe "/ted_ed.html" do
    it "should load" do
      visit_tool '/ted_ed.html'
      check_default_results
      youtube_test
    end
  end
  
  describe "/twitter.html" do
    it "should load search" do
      visit_tool '/twitter.html'
      fill_in('query', :with => 'bacon')
      click_on('Preview')
      all('iframe')[0][:src].should match(/twitter\.html/)
      click_on('Add')
      check_embed_result(:iframe, /twitter\.html\?#type=search&amp;query=bacon/)
    end
    
    it "should load user" do
      visit_tool '/twitter.html'
      page.select('User Tweets', :from => 'type')
      fill_in('query', :with => 'bacon')
      click_on('Preview')
      all('iframe')[0][:src].should match(/twitter\.html/)
      click_on('Add')
      check_embed_result(:iframe, /twitter\.html\?#type=profile&amp;query=bacon/)
    end
    
    it "should render twitter iframes correctly" do
      visit '/index.html'
      visit_tool '/twitter.html#type=search&query=love'
      keep_trying_until{ all('.twtr-tweet').length > 0 }
      all('#twtr-widget-1').length.should == 1
      all('#twtr-widget-1 .twtr-hd h4')[0].text.should == 'love'
      all('#twtr-widget-1 .twtr-tweet').length.should > 5
      
      visit '/index.html'
      visit_tool '/twitter.html#type=profile&query=whitmer'
      keep_trying_until{ all('#twtr-widget-1').length > 0 }
      all('#twtr-widget-1').length.should == 1
      all('#twtr-widget-1 .twtr-hd h4')[0].text.should == 'whitmer'
      all('#twtr-widget-1 .twtr-tweet').length.should > 5
    end
  end
  
  describe "/usatoday.html" do
    it "should load" do
      visit_tool '/usatoday.html'
      fill_in('query', :with => 'love')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      find("#results .result").click
      check_embed_result(:link, /usatoday\.com/)
    end
  end
  
  describe "/wikipedia.html" do
    it "should load" do
      visit_tool '/wikipedia.html'
      fill_in('query', :with => 'justin bieber')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      find("#results .result .title").text.should match(/bieber/i)
      find("#results .result").click
      check_embed_result(:link, /wikipedia\.org/)
      
      visit_tool '/wikipedia.html'
      fill_in('query', :with => 'heart')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      find("#results .result .title").text.should match(/heart/i)
      find("#results .result .embed").click
      check_embed_result(:iframe, /wikipedia\.org/)
    end
  end
  
  describe "/wiktionary.html" do
    it "should load" do
      visit_tool '/wiktionary.html'
      fill_in('query', :with => 'heart')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      find("#results .header a")[:href].should match(/wiktionary\.org\/wiki\/heart/)
      find("#results .header a").text.should == 'heart'
      find("#results .result .type").text.should match(/noun/i)
      find("#results .result").click
      check_embed_result(:oembed, /wiktionary\.org/)
    end
  end
  
  describe "/youtube.html" do
    it "should load" do
      visit_tool '/youtube.html'
      youtube_test
    end
  end
  
  def youtube_test
    find('#search .btn').click
    keep_trying_until{ all('#results .result').length > 5 }
    fill_in('query', :with => 'a')
    find('#search .btn').click
    keep_trying_until{ all('#results .result').length > 5 }
    find("#results .result").click
    check_embed_result(:link, /youtube/)
  end
  
  describe "/index.html" do
    it "should load" do
      visit '/index.html'
      all_apps = all('#contents .app').length
      all_apps.should > 20
      page.select('Recently Added', :from => 'category')
      all('#contents .app').length.should < all_apps
      page.select('All Categories', :from => 'category')
      all('#contents .app').length.should == all_apps
      page.select('K-6th Grade', :from => 'level')
      all('#contents .app').length.should < all_apps
      page.select('All Grade Levels', :from => 'level')
      all('#contents .app').length.should == all_apps
    end
  end
end
