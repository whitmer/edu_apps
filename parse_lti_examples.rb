require 'rubygems'
require 'active_support'
require './lti_example'

apps = JSON.parse(File.read('./public/data/lti_examples.json'))
apps.each_with_index do |app, idx|
  obj = App.build_or_update(app['id'], app, true)
  json = obj.settings
  puts ""
  puts "#{idx} " + app['id'] + " #{obj.id}"
  diff = json.diff(app)
  puts diff.to_json
  puts "---"
end.length