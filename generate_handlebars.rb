puts `handlebars ./handlebars/ -f ./handlebars/bin/templates.js -k ./public/common.js`
template = File.read('./handlebars/bin/templates.js')
str = "// Handlebars templates"
common = File.read('./public/common.js').split(str)[0]
common += str + "\n" + template
File.open('./public/common.js', 'w') do |f|
  f.puts common
end