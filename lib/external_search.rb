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