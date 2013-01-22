require 'sinatra/base'
require 'json'
require 'nokogiri'

module Sinatra
  module ExternalSearch
    get "/quizlet_search" do
      @@quizlet_config = ExternalConfig.first(:config_type => 'quizlet')
      return "Quizlet not propertly configured" unless @@quizlet_config
      uri = URI.parse("https://api.quizlet.com/2.0/search/sets")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      tmp_url = uri.path+"?q=#{params['q']}&client_id=#{@@quizlet_config.value}"
      request = Net::HTTP::Get.new(tmp_url)
      response = http.request(request)
      return response.body
    end
    
    get "/storify_search" do
      url = "http://api.storify.com/v1/stories/browse/popular?per_page=21"
      if params['sort'] == 'latest'
        if !params['q'] || params['q'].empty?
          url = "http://api.storify.com/v1/stories/browse/latest?per_page=21"
        else
          url = "http://api.storify.com/v1/stories/search?q=#{CGI.escape(params['q'])}&per_page=21"
        end
      else
        if !params['q'] || params['q'].empty?
          url = "http://api.storify.com/v1/stories/browse/featured?per_page=21"
        else
          url = "http://api.storify.com/v1/stories/search?q=#{CGI.escape(params['q'])}&sort=stats.views&per_page=21"
        end
      end
      uri = URI.parse(url)
      response = Net::HTTP.get(uri)
      json = JSON.parse(response)
      return json['content']['stories'].to_json
    end
    
    get '/tweet_embed' do
      tweet = CachedTweet.first(:tweet_id => params['id'])
      return tweet.data if tweet
      url = "https://api.twitter.com/1/statuses/oembed.json?id=#{params['id']}"
      uri = URI.parse(url)
      path = uri.path + "?" + uri.query
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      request = Net::HTTP::Get.new(path)
      response = http.request(request)
      json = JSON.parse(response.body)
      if json['html']
        CachedTweet.create(:tweet_id => params['id'], :data => response.body)
      end
      response.body
    end
    
    get '/usa_today_search' do
      @@usa_today_config = ExternalConfig.first(:config_type => 'usa_today')
      query = CGI.escape(params['q'] || '')
      url = "http://api.usatoday.com/open/articles?search=#{query}&count=15&encoding=json&api_key=#{@@usa_today_config.value}"
      response = Net::HTTP.get(URI.parse(url))
      return response
    end
    
    get '/schooltube_search' do
      query = CGI.escape(params['q'] || '')
      search = query.length > 0 ? "/search/" : "/"
      url = "http://www.schooltube.com/api/v1/video#{search}?term=#{query}&order_by=-view_count&limit=48"
      response = Net::HTTP.get(URI.parse(url))
      return response
    end
    
    get '/slideshare_search' do
      @@slideshare_config = ExternalConfig.first(:config_type => 'slideshare')
      return "Slideshare not properly configured" unless @@slideshare_config
      uri = URI.parse("http://www.slideshare.net/api/2/search_slideshows")
      ts = Time.now.to_i.to_s
      sig = Digest::SHA1.hexdigest(@@slideshare_config.secret + ts)
      http = Net::HTTP.new(uri.host, uri.port)
      tmp_url = uri.path+"?q=#{params['q']}&api_key=#{@@slideshare_config.value}&ts=#{ts}&hash=#{sig}&items_per_page=24&cc=1"
      request = Net::HTTP::Get.new(tmp_url)
      response = http.request(request)
      xml = Nokogiri(response.body)
      res = []
      xml.css('Slideshow').each do |slideshow|
        res << {
          :title => slideshow.css('Title')[0].content,
          :description => slideshow.css('Description')[0].content,
          :url => slideshow.css('URL')[0].content,
          :image_url => slideshow.css('ThumbnailURL')[0].content,
          :embed_code => slideshow.css('Embed')[0].content,
          :author => slideshow.css('Username')[0].content
        }
      end
      return res.to_json
    end
    
    get '/pinterest_search' do
      uri = URI.parse("https://api.pinterest.com/v2/popular/?limit=30")
      path = uri.path
      if params['q'] && !params['q'].empty?
        uri = URI.parse("https://api.pinterest.com/v2/search/pins/")
        path = uri.path+"?query=#{CGI.escape(params['q'])}&limit=30"
      end
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      request = Net::HTTP::Get.new(path)
      response = http.request(request)
      return response.body
    end
    
    get '/wikipedia_search' do
      uri = URI.parse("https://en.wikipedia.org/w/api.php")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      tmp_url = uri.path + "?action=query&list=search&srsearch=#{CGI.escape(params['q'])}&srprop=snippet&srlimit=21&format=json"
      request = Net::HTTP::Get.new(tmp_url)
      request['User-Agent'] = "LTI-Examples Searcher"
      response = http.request(request)
      res = []
      json = JSON.parse(response.body)
      json['query']['search'].each do |result|
        res << {
          :title => result['title'],
          :description => result['snippet'],
          :url => "http://en.wikipedia.org/wiki/#{result['title']}"
        }
      end
      return res.to_json
    end
    
    get '/cnx_search' do
      uri = URI.parse("http://cnx.org/content/opensearch?words=#{CGI.escape(params['q'])}&b_size=12")
      xml = Nokogiri(Net::HTTP.get(uri))
      res = []
      xml.css('item').each do |item|
        res << {
          :title => item.css('title')[0].content,
          :description => item.css('description')[0].content,
          :url => item.css('link')[0].content
        }
      end
      return res.to_json
    end
    
    get '/ocw_search' do
      uri = URI.parse("http://www.ocwsearch.com/api/v1/search.json?q=#{CGI.escape(params['q'])}&contact=#{CGI.escape('http://www.instructure.com')}")
      json = JSON.parse(Net::HTTP.get(uri))
      res = []
      json['Results'].to_a.sort_by{|k, v| k.to_i }.each do |k, result|
        next unless result['Title']
        res << {
          :title => result['Title'],
          :description => result['Description'],
          :url => result['CourseURL']
        }
      end
      return res.to_json
    end
    
    get '/youtube_edu_browse' do
      if params['course_id']
        url = "http://gdata.youtube.com/feeds/api/edu/lectures?course=#{params['course_id']}&v=2"
        lectures = []
        while url
          uri = URI.parse(url)
          xml = Nokogiri::HTML(Net::HTTP.get(uri))
          xml.css('entry').each do |lecture|
            lectures << {
              :id => lecture.css('videoid')[0].content,
              :thumbnail => lecture.css('group thumbnail')[0]['url'],
              :title => lecture.css('title')[0].content,
              :updated => lecture.css('updated')[0].content,
              :description => lecture.css('group description')[0].content,
              :duration => lecture.css('duration')[0]['seconds']
            }
          end
          url = xml.css("link[rel='next']")[0]['href'] rescue nil
        end
        return lectures.to_json
      elsif params['category_id'] && params['category_id'] != 'root'
        url = "http://gdata.youtube.com/feeds/api/edu/courses?v=2&category=#{params['category_id']}"
        uri = URI.parse(url)
        xml = Nokogiri::HTML(Net::HTTP.get(uri))
        courses = []
        xml.css('entry').each do |course|
          courses << {
            :thumbnail => course.css('group thumbnail')[0]['url'],
            :title => course.css('title')[0].content,
            :id => course.css('playlistid')[0].content,
            :updated => course.css('updated')[0].content
          }
        end
        return courses.to_json
      else
        url = "http://gdata.youtube.com/schemas/2007/educategories.cat"
        uri = URI.parse(url)
        xml = Nokogiri::HTML(Net::HTTP.get(uri))
        cats_by_parent = {}
        xml.css('category').each do |cat|
          next if cat['term'] == '0'
          parent_id = cat.css('parentcategory')[0]['term'] rescue 'root'
          parent_id = 'root' if parent_id == '0'
          cats_by_parent[parent_id] ||= []
          cats_by_parent[parent_id] << {
            :id => cat['term'],
            :title => cat['label']
          }
        end
#        cats_by_parent['root'].each do |cat|
#          url = "http://gdata.youtube.com/feeds/api/edu/courses?v=2&category=#{cat[:id]}&max-results=1"
#          uri = URI.parse(url)
#          xml = Nokogiri::HTML(Net::HTTP.get(uri))
#          cat[:thumbnail] = xml.css('entry group thumbnail')[0]['url']
#        end
        return cats_by_parent.to_json
      end
    end
    
    get "/nytimes_search" do
      @@nytimes_config = ExternalConfig.first(:config_type => 'nytimes')
      search = "rank=#{params['rank'] || 'newest'}"
      if params['year'] && params['year'] != 'any'
        search += "&begin_date=#{params['year']}0101&end_date=#{params['year']}1231"
      end
      query = CGI.escape(params['q'] || '')
      url = "http://api.nytimes.com/svc/search/v1/article?format=json&#{search}&query=#{query}&api-key=#{@@nytimes_config.value}"
      puts url
      uri = URI.parse(url)
      response = Net::HTTP.get(uri)
      puts response
      json = JSON.parse(response)
      return json['results'].to_json
    end
    
    get "/wiktionary_search" do
      url = "http://en.wiktionary.org/wiki/#{params['q']}"
      uri = URI.parse(url)
      html = Nokogiri::HTML(Net::HTTP.get(uri))
      categories = html.css('ol')
      res = []
      categories.each do |cat|
        type = nil
        lang = nil
        head = cat.previous
        while head && !head.name.match(/^h\d/)
          head = head.previous
        end
        type = head
        while head && head.name != 'h2'
          head = head.previous
        end
        lang = head
        if type && type.css('.mw-headline').length > 0 && lang && lang.css('#English').length > 0
          type_text = type.css('.mw-headline')[0].text
          if type_text != 'References'
            res << {:type => type_text, :definitions => []}
            cat.children.each do |li|
              li.css('ul,dl').each(&:remove)
              res[-1][:definitions] << li.text.strip unless li.text.strip.empty?
            end
          end
        end
      end
      return res.to_json
    end
  end
  
  register ExternalSearch
end