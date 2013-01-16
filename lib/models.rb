require 'dm-core'
require 'dm-migrations'
require 'dm-aggregates'
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
  
  def to_json
    {
      :id => self.id,
      :username => self.username,
      :apps => self.apps
    }.to_json
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
  property :avg_rating, Float
  property :ratings_count, Integer
  property :comments_count, Integer
  
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
  
  def self.config_options(hash, params, host)
    result = {}
    hash['config_options'] ||= []
    opts = {}
    hash['config_options'].each{|o| opts[o['name']] = o}
    hash['options'] = opts
    
    # Some tools have multiple configs in a dropdown, which affects the launch URL, name and description
    if hash['config_urls']
      match = hash['config_urls'].detect{|o| o['url'] == params['launch_type'] }
      match ||= hash['config_urls'][0]['url']
      params['launch_name'] = match['description']
      hash['launch_url'] = match['url']
    end
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
    result['launch_url'] = host + "/tools/public_collections/index.html?tool=#{result['id']}"
    result['icon_url'] = host + "/tools/#{result['id']}/icon.png"
    result['editor_button'] = {
      'launch_url' => result['launch_url'],
      'icon_url' => result['icon_url'],
      'width' => hash['width'] || 690,
      'height' => hash['height'] || 530
    }
    result['editor_button'] = {
      'launch_url' => result['launch_url'],
      'icon_url' => result['icon_url'],
      'width' => hash['width'] || 690,
      'height' => hash['height'] || 530
    }
  end
  
  def self.set_open_launch_options!(result, hash, host)
    result['privacy_level'] = 'anonymous'
    result['launch_url'] = host + "/tools/#{result['id']}/index.html"
    result['icon_url'] = host + "/tools/#{result['id']}/icon.png"
    if hash['extensions'].include?('editor_button')
      result['editor_button'] = {
        'launch_url' => result['launch_url'],
        'icon_url' => result['icon_url'],
        'width' => hash['width'] || 690,
        'height' => hash['height'] || 530
      }
    end
    if hash['extensions'].include?('resource_selection')
      result['editor_button'] = {
        'launch_url' => result['launch_url'],
        'icon_url' => result['icon_url'],
        'width' => hash['width'] || 690,
        'height' => hash['height'] || 530
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
    string.gsub(/{{\s*([\w_]+)\s*}}/){|w| params[$1] || (opts[$1] && opts[$1]['value']) || '' }
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
