require 'dm-core'
require 'dm-migrations'
require 'dm-aggregates'
require 'sinatra/base'

class ExternalConfig
  include DataMapper::Resource
  property :id, Serial
  property :config_type, String
  property :value, String
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