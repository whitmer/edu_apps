require File.dirname(__FILE__) + '/spec_helper'

require 'capybara'
require 'capybara/dsl'


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
  
  def load_config(key) 
    ExternalConfig.create(:config_type => key, :value => YAML.load_file('./test_keys.yml')[key]['key'], :secret => YAML.load_file('./test_keys.yml')[key]['secret'])
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

  describe "/tools/public_collections/index.html" do
    it "shoud load" do
      populate_apps
      visit_tool '/tools/public_collections/index.html'
      keep_trying_until{ all('#tools .tool').length > 20 }
      all('#tools .tool').length.should > 20
      fill_in('query', :with => 'codec')
      all('#tools .tool').length.should < 20
      find("#query").set('')
      find("#search button").click
      all('#tools .tool').length.should > 20
      first("#tools .tool").click
      page.should have_selector('#back')
      first("#back").click
      keep_trying_until{ all('#tools .tool').length > 20 }
      all('#tools .tool').length.should > 20
    end
  end
  
  describe "/tools/archive/index.html" do
    it "should load" do
      visit_tool '/tools/archive/index.html'
      fill_in('query', :with => 'man')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      first("#results .result .title").text.should match(/man/i)
      first("#results .result").click
      check_embed_result(:link, /archive\.org/)
    end
  end
  
  describe "/tools/graph_builder/index.html" do
    it "should load" do
      visit '/tools/graph_builder/index.html'
      page.should have_selector('iframe')
    end
  end
  
  describe "/tools/khan_academy/index.html" do
    it "should load" do
      visit_tool '/tools/khan_academy/index.html'
      youtube_test
    end
  end
  
  describe "/tools/ocw_search/index.html" do
    it "should load" do
      visit_tool '/tools/ocw_search/index.html'
      fill_in('query', :with => '11.948 mit')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      first("#results .result .title").text.should match(/11\.948/i)
      first("#results .result").click
      check_embed_result(:link, /ocw\.mit\.edu/)
    end
  end
  
  describe "/tools/quizlet/index.html" do
    # needs an api token
    it "should load" do
      load_config('quizlet')
      visit_tool '/tools/quizlet/index.html'
      fill_in('query', :with => 'car')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      first("#results .result .title").text.should match(/car/i)
      first("#results .result").click
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
  
  describe "/tools/schooltube/index.html" do
    it "should load" do
      visit_tool '/tools/schooltube/index.html'
      keep_trying_until{ all('#results .result').length > 5 }
      fill_in('query', :with => 'biology')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      first("#results .result .title").text.should match(/biology/i)
      first("#results .result").click
      check_embed_result(:link, /bit\.ly/)
    end
  end
  
  describe "/tools/slideshare/index.html" do
    it "should load" do
      load_config('slideshare')
      visit_tool '/tools/slideshare/index.html'
      fill_in('query', :with => 'bacon')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      first("#results .result .title").text.should match(/bacon/i)
      first("#results .result").click
      find("#slideshare_wrapper object").should_not be_nil
      find("#link").click
      check_embed_result(:link, /slideshare\.net/)
    end
  end
  
  describe "/tools/storify/index.html" do
    it "should load" do
      visit_tool '/tools/storify/index.html'
      keep_trying_until{ all('#results .result').length > 5 }
      page.select('Latest', :from => 'type')
      keep_trying_until{ all('#results .result').length > 5 }
      fill_in('query', :with => 'love')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      first("#results .result").click
      check_embed_result(:link, /storify\.com/)
    end
  end
  
  describe "/tools/ted_ed/index.html" do
    it "should load" do
      visit_tool '/tools/ted_ed/index.html'
      check_default_results
      youtube_test
    end
  end
  
  describe "/tools/twitter/index.html" do
    it "should load search" do
      visit_tool '/tools/twitter/index.html'
      fill_in('query', :with => 'bacon')
      click_on('Preview')
      all('iframe')[0][:src].should match(/twitter\/index\.html/)
      click_on('Add')
      check_embed_result(:iframe, /twitter\/index\.html\#type=search&amp;query=bacon/)
    end
    
    it "should load user" do
      visit_tool '/tools/twitter/index.html'
      page.select('User Tweets', :from => 'type')
      fill_in('query', :with => 'bacon')
      click_on('Preview')
      all('iframe')[0][:src].should match(/twitter\/index\.html/)
      click_on('Add')
      check_embed_result(:iframe, /twitter\/index\.html\#type=profile&amp;query=bacon/)
    end
    
    it "should render twitter iframes correctly" do
      visit '/index.html'
      visit_tool '/tools/twitter/index.html#type=search&query=love'
      keep_trying_until{ all('.twtr-tweet').length > 0 }
      all('#twtr-widget-1').length.should == 1
      all('#twtr-widget-1 .twtr-hd h4')[0].text.should == 'love'
      all('#twtr-widget-1 .twtr-tweet').length.should > 5
      
      visit '/index.html'
      visit_tool '/tools/twitter/index.html#type=profile&query=whitmer'
      keep_trying_until{ all('#twtr-widget-1').length > 0 }
      all('#twtr-widget-1').length.should == 1
      all('#twtr-widget-1 .twtr-hd h4')[0].text.should == 'whitmer'
      all('#twtr-widget-1 .twtr-tweet').length.should > 5
    end
  end
  
  describe "/tools/usa_today/index.html" do
    it "should load" do
      load_config('usa_today')
      visit_tool '/tools/usa_today/index.html'
      fill_in('query', :with => 'hope')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      first("#results .result").click
      check_embed_result(:link, /usatoday\.com/)
    end
  end
  
  describe "/tools/wikipedia/index.html" do
    it "should load" do
      visit_tool '/tools/wikipedia/index.html'
      fill_in('query', :with => 'justin bieber')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      first("#results .result .title").text.should match(/bieber/i)
      first("#results .result").click
      check_embed_result(:link, /wikipedia\.org/)
      
      visit_tool '/tools/wikipedia/index.html'
      fill_in('query', :with => 'heart')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      first("#results .result .title").text.should match(/heart/i)
      first("#results .result .embed").click
      check_embed_result(:iframe, /wikipedia\.org/)
    end
  end
  
  describe "/tools/wiktionary/index.html" do
    it "should load" do
      visit_tool '/tools/wiktionary/index.html'
      fill_in('query', :with => 'heart')
      find('#search .btn').click
      keep_trying_until{ all('#results .result').length > 5 }
      find("#results .header a")[:href].should match(/wiktionary\.org\/wiki\/heart/)
      find("#results .header a").text.should == 'heart'
      first("#results .result .type").text.should match(/noun/i)
      first("#results .result").click
      check_embed_result(:oembed, /wiktionary\.org/)
    end
  end
  
  describe "/tools/youtube/index.html" do
    it "should load" do
      visit_tool '/tools/youtube/index.html'
      youtube_test
    end
  end
  
  def youtube_test
    find('#search .btn').click
    keep_trying_until{ all('#results .result').length > 5 }
    fill_in('query', :with => 'a')
    find('#search .btn').click
    keep_trying_until{ all('#results .result').length > 5 }
    first("#results .result").click
    check_embed_result(:link, /youtube/)
  end
  
  describe "/index.html" do
    it "should load" do
      populate_apps
      visit '/index.html'
      keep_trying_until{ all('#content .app').length > 5 }
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
