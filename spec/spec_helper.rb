RACK_ENV='test'
require 'rspec'
require 'rack/test'
require 'json'
require './lti_example'

set :environment, :test

RSpec.configure do |config|
  config.before(:each) { DataMapper.auto_migrate! }
end