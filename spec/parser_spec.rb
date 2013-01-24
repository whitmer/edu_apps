require File.dirname(__FILE__) + '/spec_helper'

describe 'Parsers' do
  include Rack::Test::Methods
  
  def app
    Sinatra::Application
  end
    
  describe "app parsing" do
    describe "parsing apps from JSON" do
      @apps = JSON.parse(File.read('./public/data/lti_examples.json')).select{|a| !a['pending'] }
      @apps = JSON.parse(File.read('./public/data/lti_examples.json')).select{|a| !a['pending'] }
      @apps.each do |app|
        it "should parse #{app['name']}" do
          hash = AppParser.parse(app)
          hash['added'] = app['added']
          hash['uses'] = app['uses']
          Hasher.diff(hash, app).should == nil
        end
      end
    end

    it "should parse data apps" do
      args = {
      }
      hash = AppParser.parse(args)
    end
    it "should reject large data sets for data apps"
    it "should ignore extra options for data apps"
    it "should parse open launch apps"
    it "should ignore extra options for open launch apps"
    it "should parse config xml apps"
    it "should ignore extra options for config xml apps"
    it "should parse manually configured apps"
    it "should ignore extra options for manually configured apps"
    # parse_data_json
    it "should return nil for expected numeric values" do
      AppParser.unless_zero("").should == nil
      AppParser.unless_zero("123").should == 123
      AppParser.unless_zero("0").should == nil
      AppParser.unless_zero("-1215").should == -1215
      AppParser.unless_zero(nil).should == nil
    end
    
    it "should return nil for expected string values" do
      AppParser.unless_empty("").should == nil
      AppParser.unless_empty(" ").should == " "
      AppParser.unless_empty("bob").should == "bob"
      AppParser.unless_empty(nil).should == nil
    end

    it "should parse preview parameters"
    # parse_preview
    it "should parse config option parameters"
    # parse_config_options
    it "should parse custom field parameters"
    # parse_custom_fields
    it "should parse app type parameters" do
      AppParser::APP_TYPES.each do |type|
        AppParser.parse_app_type(type).should == type
      end
      AppParser.parse_app_type("").should == nil
      AppParser.parse_app_type("custom").should == nil
      AppParser.parse_app_type(nil).should == nil
    end

    it "should parse privacy level parameters" do
      AppParser::PRIVACY_LEVELS.each do |lev|
        AppParser.parse_privacy_level(lev).should == lev
      end
      AppParser.parse_privacy_level("").should == nil
      AppParser.parse_privacy_level("super_public").should == nil
      AppParser.parse_privacy_level(nil).should == nil
    end

    it "should parse category parameters" do
      AppParser::CATEGORIES.each do |ext|
        AppParser.parse_categories({'categories' => [ext]}).should == [ext]
      end
      AppParser.parse_categories({'categories' => ["a", "K-6th Grade", "Content"]}).should == ["Content"]
      AppParser.parse_categories({'categories' => ["asdf", "", nil, "Math", "Open Content"]}).should == ["Math", "Open Content"]
    end

    it "should parse extension parameters" do
      AppParser::EXTENSIONS.each do |ext|
        AppParser.parse_extensions({'extensions' => [ext]}).should == [ext]
      end
      AppParser.parse_extensions({'extensions' => ["a", "K-6th Grade", "editor_button"]}).should == ["editor_button"]
      AppParser.parse_extensions({'extensions' => ["asdf", "", nil, "course_nav", "account_nav"]}).should == ["course_nav", "account_nav"]
    end

    it "should parse grade level parameters" do
      AppParser::LEVELS.each do |level|
        AppParser.parse_levels({'levels' => [level]}).should == [level]
      end
      AppParser.parse_levels({'levels' => ["a", "K-6th Grade", "d"]}).should == ["K-6th Grade"]
      AppParser.parse_levels({'levels' => ["asdf", "", nil]}).should == []
    end
  end
  
  describe "parsing xml config options" do
    describe "parsing config options from JSON apps" do
      @apps = JSON.parse(File.read('./public/data/lti_examples.json')).select{|a| !a['pending'] }
      @apps.each do |app|
        it "should handle config for #{app['name']}" do
          params = {}
          if app['config_xml']
          elsif app['config_options'] && app['config_options'].any?{|o| o['required'] }
            app['config_options'].each{|o| params[o['name']] = o['value'].to_s }
          end
          opts = XmlConfigParser.config_options(app, params, "http://www.example.com")
          opts.should_not be_nil
        end
      end
    end
    it "should parse data app configs"
    it "should parse open launch app configs"
    it "should parse custom xml configs"
    it "should parse configs with parameters"

    it "should prepend host parameters where appropriate" do
      XmlConfigParser.prepend_host("/bacon.html", "http://www.google.com").should == "http://www.google.com/bacon.html"
      XmlConfigParser.prepend_host("bacon.html", "http://www.google.com").should == "bacon.html"
      XmlConfigParser.prepend_host("google.com/bacon.html", "http://www.google.com").should == "google.com/bacon.html"
      XmlConfigParser.prepend_host("http://google.com/bacon.html", "http://www.google.com").should == "http://google.com/bacon.html"
    end

    it "should substitute parameters correctly" do
      XmlConfigParser.sub("{{ one }} and {{two}}", {'options' => {}}, {'one' => '1', 'two' => '2'}).should == "1 and 2"
    end
    it "should substitute config option fallbacks" do
      XmlConfigParser.sub("{{ one }} and {{two}}", {'options' => {'one' => {'value' => '1'}}}, {'two' => '2'}).should == "1 and 2"
    end
    it "should remove empty substitutions" do
      XmlConfigParser.sub("{{ one }} and {{two}}", {'options' => {'one' => {'value' => '1'}}}, {}).should == "1 and "
    end
    it "should escape parameters where specified" do
      XmlConfigParser.sub("{{ escape:one }} and {{two}}", {'options' => {}}, {'one' => 'o n&e', 'two' => '2'}).should == "o+n%26e and 2"
    end
    
    it "should handle non-empty arguments correctly" do
      XmlConfigParser.non_empty_or_default('val', {'options' => {'val' => {}}}, {}, 'bob').should == 'bob'
      XmlConfigParser.non_empty_or_default('val', {'options' => {'val' => {}}}, {'val' => 'fred'}, 'bob').should == 'fred'
      XmlConfigParser.non_empty_or_default('val', {'options' => {'val' => {'value' => 'sam'}}}, {}, 'bob').should == 'sam'
      XmlConfigParser.non_empty_or_default('val', {'options' => {'val' => {'value' => 'sam'}}}, {'val' => 'fred'}, 'bob').should == 'fred'
      XmlConfigParser.non_empty_or_default('val', {'options' => {}}, {'val' => 'fred'}, 'bob').should == 'bob'
      XmlConfigParser.non_empty_or_default('val', {'options' => {}}, {}, 'bob').should == 'bob'
    end
  end
end