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
  
  def self.allow_access(tool_id, username)
    ap = AdminPermission.first_or_new(:username => username)
    if ap.apps == 'any'
    elsif ap.apps
      ap.apps = (ap.apps + "," + tool_id).split(/,/).uniq.join(',')
    else
      ap.apps = tool_id
    end
    ap.save
    ap
  end
  
  def full_admin?
    allowed_access?
  end
  
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

class AppFilter
  include DataMapper::Resource
  property :id, Serial
  property :username, String
  property :code, String, :length => 1024
  property :settings, Json
  
  def update_settings(params)
    self.settings = {}
    self.code ||= Digest::MD5.hexdigest(self.username + Time.now.to_i.to_s + rand(9999).to_s)
    self.settings['app_ids'] = {}
    self.settings['allow_new'] = params['allow_new'] == true || params['allow_new'] == '1'
    App.load_apps.each do |app|
      self.settings['app_ids'][app['id']] = false
    end
    (params['app_ids'] || []).each do |id|
      self.settings['app_ids'][id] = true
    end
    self.save
  end
  
  def as_json
    res = self.settings || {}
    res['code'] = self.code
    res
  end
  
  def to_json
    as_json.to_json
  end
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
  property :beta, Boolean
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
      res['data_url'] ||= "/tools/#{res['id']}/data.json"
      res['extensions'] = ["editor_button", "resource_selection"]
      res['any_key'] = true
      res['preview'] ||= {
        "url" => "/tools/public_collections/index.html?tool=#{res['id']}",
        "height" => res['height'] || 475
      }
      res['open_launch_url'] = "/tools/#{res['id']}/index.html"
      
    elsif res['app_type'] == 'open_launch'
      res['any_key'] = true
      res['extensions'] = ["editor_button", "resource_selection"]
      res['preview'] ||= {
        "url" => "/tools/#{res['id']}/index.html",
        "height" => res['height'] || 475
      }
      res['open_launch_url'] = "/tools/public_collections/index.html?tool=#{res['id']}"
    end
    if opts['host']
      ['big_image_url', 'image_url', 'icon_url', 'banner_url', 'logo_url', 'config_url', 'launch_url', 'open_launch_url'].each do |key|
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
  
  def self.load_apps(filter=nil)
    allow_new = true if !filter
    lookups = ((filter && filter.settings) || {})['app_ids'] || {}
    allow_new = (filter.settings['allow_new'] || false) if filter
    data_apps = App.all(:pending => false).select{|a| 
      a.settings && lookups[a.settings['id']] != false && (allow_new || lookups[a.settings['id']] == true )
    }.map{|a| a.settings }
  end
  
  def self.build_or_update(id, params, admin_permission, user_key=nil)
    app = App.first_or_new(:tool_id => id)
    full_admin = admin_permission && admin_permission.full_admin?
    # Permission required to update an existing app
    if app.id && !admin_permission
      return false
    end
    # Non-admins can only suggest apps
    
    # Do the parsing
    hash = AppParser.parse(params)
    hash['added'] = (full_admin && params['added'] && params['added'].length > 0 && params['added']) || app.added || (!app.pending && Time.now.utc.iso8601)
    hash['uses'] = (full_admin && params['uses'] && params['uses'].to_i) || (app.settings && app.settings['uses'])
    hash['submitter_name'] = user_key ? user_key : (app.settings && app.settings['submitter_name'])
    hash['submitter_url'] = user_key ? "https://twitter.com/#{user_key}" : (app.settings && app.settings['submitter_url'])
    if full_admin
      hash['submitter_name'] = params['submitter_name'] if params['submitter_name']
      hash['submitter_url'] = params['submitter_url'] if params['submitter_url']
    end

    if full_admin
      if !params['pending'].nil?
        hash['pending'] = (params['pending'] == '1' || params['pending'] == true)
      end
    elsif admin_permission
      hash['pending'] = (params['pending'] == '1' || params['pending'] = true) ? true : nil
    else
      hash['pending'] = true
    end
    if user_key
      AdminPermission.allow_access(id, "@" + user_key)
    end
    hash.delete('pending') if !hash['pending']

    app.pending = hash['pending'] || false
    app.beta = hash['beta'] || false
    app.name = hash['name']
    app.categories = (hash['categories'] || []).join(",")
    app.levels = (hash['levels'] || []).join(",")
    app.added = hash['added']
    app.extensions = (hash['extensions'] || []).join(",")
    app.platforms = (hash['platforms'] || []).join(",")
    app.tool_id = hash['id']
    app.settings = hash
    app.save
    app
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

class CachedTweet
  include DataMapper::Resource
  property :id, Serial
  property :tweet_id, String, :length => 512
  property :data, Text
end

class GoogleChart
  include DataMapper::Resource
  property :id, Serial
  property :chart_id, String, :length => 512
  property :data, Json
  
  def to_json
    {:key => self.chart_id, :data => self.data}.to_json
  end
end
