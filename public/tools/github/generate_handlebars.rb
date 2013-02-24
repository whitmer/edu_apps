template = File.read('./handlebars/bin/templates.js')
str = "// Handlebars templates"
common = File.read('./public/tools/github/repo.js').split(str)[0]
common += str + "\n" + `handlebars ./public/tools/github/repo.handlebars`
File.open('./public/tools/github/repo.js', 'w') do |f|
  f.puts common
end