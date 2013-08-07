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

  def as_json
    {
        id: self.id,
        tool_id: self.tool_id,
        tool_name: self.tool_name,
        user_name: self.user_name,
        user_url: self.user_url,
        user_avatar_url: self.user_avatar_url,
        user_id: self.user_id,
        external_access_token_id: self.external_access_token,
        created_at: self.created_at,
        rating: self.rating,
        comments: self.comments
    }
  end

  def to_json
    as_json.to_json
  end
end