require './edu_apps'


json = {}

json[:apps] = App.all.select{|a| a.settings }.map{|o| o.settings}
json[:permissions] = AdminPermission.all.map{|o| o.to_json}
json[:app_filter] = AppFilter.all.map{|o| o.to_json}
json[:app_filter] = AppFilter.all.map{|o| o.to_json}
json[:app_review] = AppReview.all.map{|o| o.to_json}
json[:external_access_token] = ExternalAccessToken.all.map{|o| o.to_json}

t = Time.now.utc.iso8601
f = File.open("public/data/lti_examples-#{t}.json", 'w')
f.puts JSON.pretty_generate(json) 
f.close
puts "/public/data/lti_examples-#{t}.json"
