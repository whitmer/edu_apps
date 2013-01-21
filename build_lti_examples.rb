require './lti_example'


json = []

apps = App.all.select{|a| a.settings }
apps.each do |app|
  puts "Adding #{app.settings['id']}"
  json << app.settings
end

t = Time.now.utc.iso8601
f = File.open("public/data/lti_examples-#{t}.json", 'w')
f.puts JSON.pretty_generate(json)
f.close
puts "/public/data/lti_examples-#{t}.json"
