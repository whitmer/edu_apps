RACK_ENV='test'
require 'rspec'
require 'rack/test'
require 'json'
require './lti_example'

set :environment, :test

RSpec.configure do |config|
  config.before(:each) { DataMapper.auto_migrate! }
end

def populate_apps
  apps = JSON.parse(File.read('./public/data/lti_examples.json'))
  apps.each_with_index do |app, idx|
    obj = App.build_or_update(app['id'], app, true)
  end
end
  
