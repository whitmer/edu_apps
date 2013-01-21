require 'dm-core'
require 'dm-migrations'
require 'dm-aggregates'
require 'dm-types'
require 'sinatra/base'

class ExternalConfig
  include DataMapper::Resource
  property :id, Serial
  property :config_type, String
  property :value, String, :length => 1024
  property :secret, String
end

class ExternalAccessToken
  include DataMapper::Resource
  property :id, Serial
  property :token, String, :length => 256
  property :name, String
  property :site_url, String, :length => 1024
  property :active, Boolean
end

class AdminPermission
  include DataMapper::Resource
  property :id, Serial
  property :username, String, :length => 256
  property :apps, String, :length => 1024
  
  def allowed_access?(tool_id='any')
    if tool_id != 'any'
      self.apps == 'any' || self.apps.split(/,/).include?(tool_id)
    else
      self.apps == 'any'
    end
  end
  
  def as_json
    {
      :id => self.id,
      :username => self.username,
      :apps => self.apps
    }
  end
  def to_json
    as_json.to_json
  end
end

class LaunchRedirect
  include DataMapper::Resource
  property :id, Serial
  property :token, String, :length => 256
  property :url, String, :length => 1024
  property :created_at, Time
  property :last_launched_at, Time
  property :launches, Integer
end

class App
  include DataMapper::Resource
  property :id, Serial
  property :tool_id, String
  property :name, String
  property :avg_rating, Float
  property :ratings_count, Integer
  property :comments_count, Integer
  property :pending, Boolean
  property :categories, String, :length => 512
  property :levels, String, :length => 512
  property :added, String
  property :extensions, String, :length => 512
  property :platforms, String, :length => 512
  property :settings, Json
  
  def as_json(opts={})
    res = self.settings
    if !res
      res = App.load_apps.detect{|a| a['id'] == self.tool_id}
    end
    return nil unless res
    res['ratings_count'] = self.ratings_count || 0
    res['comments_count'] = self.comments_count || 0
    res['avg_rating'] = self.avg_rating || nil

    res['banner_url'] ||= "/tools/#{res['id']}/banner.png"
    res['logo_url'] ||= "/tools/#{res['id']}/logo.png"
    res['icon_url'] ||= "/tools/#{res['id']}/icon.png"
    cutoff = (Time.now - (60 * 60 * 24 * 7 * 24)).utc.iso8601
    res['new'] = res['added'] && res['added'] > cutoff


    res['config_url'] ||= "/tools/#{res['id']}/config.xml" if !res['config_directions']
    
    if res['app_type'] == 'data'
      res['data_url'] = "/tools/#{res['id']}/data.json"
      res['extensions'] = ["editor_button", "resource_selection"]
      res['any_key'] = true
      res['preview'] ||= {
        "url" => "/tools/public_collections/index.html?tool=#{res['id']}",
        "height" => res['height'] || 475
      }
      
    elsif res['app_type'] == 'open_launch'
      res['any_key'] = true
      res['extensions'] = ["editor_button", "resource_selection"]
      res['preview'] ||= {
        "url" => "/tools/#{res['id']}/index.html",
        "height" => res['height'] || 475
      }
    end
    if opts['host']
      ['big_image_url', 'image_url', 'icon_url', 'banner_url', 'logo_url', 'config_url', 'launch_url'].each do |key|
        res[key] = prepend_host(res[key], opts['host']) if res[key]
      end
    end
    res
  end
  
  def to_json
    as_json.to_json
  end
  
  def update_counts
    reviews = AppReview.all(:tool_id => self.tool_id)
    ratings_total, ratings_cnt = reviews.aggregate(:rating.sum, :all.count)
    if ratings_cnt > 0
      reviews_cnt = reviews.count(:comments.not => nil)
      self.avg_rating = ratings_total.to_f / ratings_cnt.to_f
      self.ratings_count = ratings_cnt
      self.comments_count = reviews_cnt
    else
      self.avg_rating = 0
      self.ratings_count = 0
      self.comments_count = 0
    end
    self.save
  end
  
  def self.load_apps
    json_apps = JSON.parse(File.read('./public/data/lti_examples.json')).select{|a| !a['pending'] }
  end
  
  def self.build_or_update(id, params, admin)
    app = App.first_or_new(:tool_id => id)
    # Permission required to update an existing app
    if app.id && !admin
      return false
    end
    # Non-admins can only suggest apps
    
    # Do the parsing
    hash = AppParser.parse(params)
    hash['added'] = (admin && params['added']) || app.added || (!app.pending && Time.now.utc.iso8601)
    hash['uses'] = admin && params['uses']
    if admin
      hash['pending'] = params['pending'] unless params['pending'].nil?
    else
      hash['pending'] = true
    end
    hash['pending'] = nil if !hash['pending']
    
    app.pending = hash['pending']
    app.name = hash['name']
    app.categories = (hash['categories'] || []).join(",")
    app.levels = (hash['levels'] || []).join(",")
    app.added = hash['added']
    app.extensions = (hash['extensions'] || []).join(",")
    app.platforms = (hash['platforms'] || []).join(",")
    app.settings = hash
    app.save
    app
  end
  
  def self.config_options(hash, params, host)
    result = {}
    hash['config_options'] ||= []
    opts = {}
    hash['config_options'].each{|o| opts[o['name']] = o}
    hash['options'] = opts
    
    hash['extensions'] ||= []
    result['name'] = sub(hash['variable_name'] || hash['name'], hash, params)
    result['description'] = sub(hash['variable_description'] || hash['short_description'] || hash['description'].split(/<br\/>/)[0], hash, params)
    result['privacy_level'] = hash['privacy_level'] || 'anonymous'
    result['id'] = hash['id']
    
    # "Open launch" is syntactic sugar for a bunch of defaults
    if hash['app_type'] == 'open_launch'
      set_open_launch_options!(result, hash, host)
    # ...so is "Data launch"
    elsif hash['app_type'] == 'data'
      set_data_launch_options!(result, hash, host)
    # Otherwise we have to check a bunch of options
    else
      result['icon_url'] = hash['icon_url'] || (host + "/tools/#{result['id']}/icon.png")
      result['launch_url'] = prepend_host(sub(hash['launch_url'], hash, params), host) if hash['launch_url']
      result['domain'] = hash['domain'] if hash['domain']
      result['custom_fields'] = hash['custom_fields']
      if hash['extensions'].include?('course_nav')
        if !hash['options']['course_nav'] || params['course_nav'] == '1'
          result['course_navigation'] = {
            'launch_url' => prepend_host(sub(hash['course_nav_launch_url'] || hash['launch_url'], hash, params), host),
            'link_text' => sub(non_empty_or_default('course_nav_link_text', hash, params, result['name']), hash, params),
            'visibility' => non_empty_or_default('course_nav_visibility', hash, params),
            'default' => non_empty_or_default('course_nav_default', hash, params)
          }
        end
      end
      if hash['extensions'].include?('user_nav')
        if !hash['options']['user_nav'] || params['user_nav'] == '1'
          result['user_navigation'] = {
            'launch_url' => prepend_host(sub(hash['user_nav_launch_url'] || hash['launch_url'], hash, params), host),
            'link_text' => sub(non_empty_or_default('user_nav_link_text', hash, params, result['name']), hash, params)
          }
        end
      end
      if hash['extensions'].include?('account_nav')
        if !hash['options']['account_nav'] || params['account_nav'] == '1'
          result['account_navigation'] = {
            'launch_url' => prepend_host(sub(hash['account_nav_launch_url'] || hash['launch_url'], hash, params), host),
            'link_text' => sub(non_empty_or_default('account_nav_link_text', hash, params, result['name']), hash, params)
          }
        end
      end
      if hash['extensions'].include?('editor_button')
        if !hash['options']['editor_button'] || params['editor_button'] == '1'
          result['editor_button'] = {
            'launch_url' => prepend_host(sub(hash['editor_button_launch_url'] || hash['launch_url'], hash, params), host),
            'link_text' => sub(non_empty_or_default('editor_button_link_text', hash, params, result['name']), hash, params),
            'icon_url' => hash['editor_button_icon_url'] || result['icon_url'],
            'width' => hash['editor_button_width'] || hash['width'],
            'height' => hash['editor_button_height'] || hash['height']
          }
        end
      end
      if hash['extensions'].include?('resource_selection')
        if !hash['options']['resource_selection'] || params['resource_selection'] == '1'
          result['resource_selection'] = {
            'launch_url' => prepend_host(sub(hash['resource_selection_launch_url'] || hash['launch_url'], hash, params), host),
            'link_text' => sub(non_empty_or_default('resource_selection_link_text', hash, params, result['name']), hash, params),
            'icon_url' => hash['resource_selection_icon_url'] || result['icon_url'],
            'width' => hash['resource_selection_width'] || hash['width'],
            'height' => hash['resource_selection_height'] || hash['height']
          }
        end
      end
    end
    result
  end
  
  def self.set_data_launch_options!(result, hash, host)
    result['privacy_level'] = 'anonymous'
    result['launch_url'] = host + "/tool_redirect?id=#{result['id']}"
    result['icon_url'] = host + "/tools/#{result['id']}/icon.png"
    result['editor_button'] = {
      'launch_url' => result['launch_url'],
      'icon_url' => result['icon_url'],
      'width' => hash['width'] || 690,
      'height' => hash['height'] || 530,
      'link_text' => hash['name']
    }
    result['resource_selection'] = {
      'launch_url' => result['launch_url'],
      'icon_url' => result['icon_url'],
      'width' => hash['width'] || 690,
      'height' => hash['height'] || 530,
      'link_text' => hash['name']
    }
    result['launch_url'] = nil if hash['no_launch']
  end
  
  def self.set_open_launch_options!(result, hash, host)
    result['privacy_level'] = 'anonymous'
    result['launch_url'] = host + "/tool_redirect?id=#{result['id']}"
    result['icon_url'] = host + "/tools/#{result['id']}/icon.png"
    if hash['extensions'].include?('editor_button')
      result['editor_button'] = {
        'launch_url' => result['launch_url'],
        'icon_url' => result['icon_url'],
        'width' => hash['width'] || 690,
        'height' => hash['height'] || 530,
        'link_text' => hash['name']
      }
    end
    if hash['extensions'].include?('resource_selection')
      result['resource_selection'] = {
        'launch_url' => result['launch_url'],
        'icon_url' => result['icon_url'],
        'width' => hash['width'] || 690,
        'height' => hash['height'] || 530,
       'link_text' => hash['name']
      }
    end
  end
  
  def self.non_empty_or_default(key, hash, params, fallback=nil)
    res = params[key] if params[key] && params[key].length > 0 && hash['options'][key]
    res ||= hash['options'][key] && hash['options'][key]['value']
    res ||= hash[key]
    res ||= fallback
    res
  end
  
  def self.sub(string, hash, params)
    opts = hash['options']
    res = string.gsub(/{{\s*escape:([\w_]+)\s*}}/){|w| CGI.escape(params[$1] || (opts[$1] && opts[$1]['value']) || '') }
    res.gsub(/{{\s*([\w_]+)\s*}}/){|w| params[$1] || (opts[$1] && opts[$1]['value']) || '' }
  end
  
  def self.prepend_host(url, host)
    if url.match(/^\//)
      host + url
    else
      url
    end
  end
end

class AppReview
  include DataMapper::Resource
  property :id, Serial
  property :tool_id, String
  property :tool_name, String
  property :user_name, String
  property :user_url, String, :length => 1024
  property :user_avatar_url, String, :length => 1024
  property :user_id, String
  property :external_access_token_id, Integer
  property :created_at, Time
  property :rating, Integer
  property :comments, Text, :lazy => false
  
  belongs_to :external_access_token
  
  def source_name
    external_access_token.name
  end
  
  def source_url
    external_access_token.site_url
  end
end

module AppParser
  CATEGORIES = ["Community", "Content", "Math", "Media", "Open Content", "Science", "Study Helps", "Textbooks/eBooks", "Web 2.0"]
  LEVELS = ["K-6th Grade", "7th-12th Grade", "Postsecondary"]
  EXTENSIONS = ["course_nav", "user_nav", "account_nav", "editor_button", "resource_selection"]
  PRIVACY_LEVELS = ["public", "name_only", "anonymous"]
  APP_TYPES = ["open_launch", "data"]
  
  def self.parse(params)
    hash = {}
    hash['name'] = params['name']
    hash['id'] = params['id']
    hash['categories'] = parse_categories(params)
    hash['levels'] = parse_levels(params)
    hash['description'] = params['description']
    hash['app_type'] = parse_app_type(params['app_type'])
    hash['short_description'] = unless_empty(params['short_description'])
    hash['extensions'] = parse_extensions(params)
    hash['preview'] = parse_preview(params)
    
    if hash['app_type'] == 'open_launch'
      hash['no_launch'] = unless_empty(params['no_launch'] == '1' || params['no_launch'] == true)
    end
    
    if hash['app_type'] == 'open_launch' || hash['app_type'] == 'data'
      hash['exclude_from_public_collections'] = unless_empty(params['exclude_from_public_collections'] == '1' || params['exclude_from_public_collections'] == true)
    else
      hash['icon_url'] = unless_empty(params['icon_url'])
      hash['logo_url'] = unless_empty(params['logo_url'])
      hash['banner_url'] = unless_empty(params['banner_url'])
      hash['config_url'] = unless_empty(params['config_url'])
      hash['config_urls'] = parse_config_urls(params)
      hash['any_key'] = unless_empty(params['any_key'] == '1' || params['any_key'] == true)

      if params['app_type'] != 'custom'
        hash['launch_url'] = unless_empty(params['launch_url'])
        hash['domain'] = unless_empty(params['domain'])
        hash['config_directions'] = unless_empty(params['config_directions'])
        hash['privacy_level'] = parse_privacy_level(params['privacy_level'])
        hash['custom_fields'] = parse_custom_fields(params)
        if hash['extensions'] && hash['extensions'].include?('course_nav')
          hash['course_nav_link_text'] = unless_empty(params['course_nav_link_text'])
        end
        if hash['extensions'] && hash['extensions'].include?('user_nav')
          hash['user_nav_link_text'] = unless_empty(params['user_nav_link_text'])
        end
        if hash['extensions'] && hash['extensions'].include?('account_nav')
          hash['account_nav_link_text'] = unless_empty(params['account_nav_link_text'])
        end
      end
    end
    hash['config_options'] = parse_config_options(params)
    if hash['config_options']
      hash['variable_name'] = unless_empty(params['variable_name'])
      hash['variable_description'] = unless_empty(params['variable_description'])
    end
    if hash['extensions'] && (hash['extensions'].include?('editor_button') || hash['extensions'].include?('resource_selection')) && params['app_type'] != 'custom'
      hash['width'] = unless_zero(params['width'])
      hash['height'] = unless_zero(params['height'])
    end
    
    hash.each do |key, val|
      hash.delete(key) if val == nil
    end
    hash
  end
  
  def self.unless_zero(str)
    res = str.to_i
    res = nil if res == 0
    res
  end
  
  def self.unless_empty(str)
    if str && (str == true || str.length > 0)
      str
    else 
      nil
    end
  end
  
  def self.parse_preview(params)
    if params['preview'] && params['preview']['url']
      {
        'url' => params['preview']['url'],
        'height' => unless_zero(params['preview']['height'])
      }
    else
      nil
    end
  end
  
  def self.parse_config_options(params)
    if params['config_options'].is_a?(Hash) && params['config_options'].to_a.all?{|f| f[0].to_i > 0 }
      list = []
      params['config_options'].each do |key, args|
        list << args
      end
      params['config_options'] = list
    end
    if params['config_options'].is_a?(Array)
      list = []
      params['config_options'].each do |obj|
        res = {
          'name' => obj['name'].to_s,
          'description' => obj['description'].to_s,
          'type' => obj['type'].to_s,
          'value' => obj['value'].to_s
        }
        res['required'] = true if obj['required'] == '1' || obj['required'] == true
        list << res
      end
      list
    else
      nil
    end
  end
  
  def self.parse_config_urls(params)
    if params['config_urls'].is_a?(Hash) && params['config_urls'].to_a.all?{|f| f[0].to_i > 0 }
      list = []
      params['config_urls'].each do |key, args|
        list << args
      end
      params['config_urls'] = list
    end
    if params['config_urls'].is_a?(Array)
      list = []
      params['config_urls'].each do |obj|
        list << {
          'url' => obj['url'].to_s,
          'description' => obj['description'].to_s
        }
      end
      list
    else
      nil
    end
  end
  
  def self.parse_custom_fields(params)
    res = nil
    if params['custom_fields'].is_a?(Hash) && params['custom_fields'].to_a.all?{|f| f[0].to_i > 0 }
      hash = {}
      params['custom_fields'].each do |key, args|
        hash[args['key']] = args['value']
      end
      params['custom_fields'] = hash
    end
    if params['custom_fields'].is_a?(Hash)
      params['custom_fields'].each do |key, val|
        res ||= {}
        res[key] = val.to_s
      end
    end
    res
  end
  
  def self.parse_app_type(str)
    APP_TYPES.include?(str) ? str : nil
  end
  
  def self.parse_privacy_level(str)
    PRIVACY_LEVELS.include?(str) ? str : nil
  end
  
  def self.parse_categories(params)
    (params['categories']) & CATEGORIES
  end
  
  def self.parse_extensions(params)
    res = (params['extensions'] || []) & EXTENSIONS
    res = nil if res.empty?
    res
  end
  
  def self.parse_levels(params)
    (params['levels'] || []) & LEVELS
  end
end

module Sinatra
  module Models
    configure do 
      env = ENV['RACK_ENV'] || settings.environment
      DataMapper.setup(:default, (ENV["DATABASE_URL"] || "sqlite3:///#{Dir.pwd}/#{env}.sqlite3"))
      DataMapper.auto_upgrade!
    end
  end
  
  register Models
end
