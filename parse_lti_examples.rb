require 'rubygems'
require './lti_example'

apps = JSON.parse(File.read('./public/data/lti_examples.json'))

def diff(a, b)
  if a.is_a?(Hash) && b.is_a?(Hash)
    res = {}
    a.keys.each do |key|
      if d = diff(a[key], b[key])
        res[key] = d
      end
    end
    res.empty? ? nil : res
  elsif a.is_a?(Array) && b.is_a?(Array)
    bads = []
    a.each_with_index do |val, idx|
      if d = diff(a[idx], b[idx])
        puts d.to_json
        bads << d
      end
    end
    bads.empty? ? nil : bads
  else
    a.to_s == b.to_s ? nil : a
  end
end

apps.each_with_index do |app, idx|
  obj = App.build_or_update(app['id'], app, true)
  json = obj.settings
  puts ""
  puts "#{idx} " + app['id'] + " #{obj.id}"
  puts diff(app, json).to_json
  puts "---"
end.length
