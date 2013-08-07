class ExternalAccessToken
  include DataMapper::Resource
  property :id, Serial
  property :token, String, :length => 256
  property :name, String
  property :site_url, String, :length => 1024
  property :active, Boolean

  def as_json
    {
        id: self.id,
        token: self.token,
        name: self.name,
        site_url: self.site_url,
        active: self.active,
    }
  end

  def to_json
    as_json.to_json
  end
end