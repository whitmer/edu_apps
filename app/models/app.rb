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
  property :anonymous, Boolean
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
  
  def related_apps
    # Find apps that have the most shared reviewers with this app
    sql = "SELECT COUNT(*), b.tool_id, MAX(b.tool_name) FROM app_reviews a, app_reviews b, apps apps WHERE a.tool_id=? AND a.tool_id = apps.tool_id AND apps.pending=? AND a.tool_id!=b.tool_id AND a.user_url=b.user_url GROUP BY b.tool_id ORDER BY COUNT(*), MAX(b.tool_name)"
    apps = App.repository(:default).adapter.select(sql, self.tool_id, false).map{|row|
      {
        :tool_id => row.tool_id,
        :name => row.max,
        :score => row.count
      }
    }
    # Then find apps that match based on categories
    if apps.length < 5
      apps += App.all(:pending => false, :categories => self.categories, :levels => self.levels, :tool_id.not => self.tool_id, :order => :name, :limit => 5).map{|app|
        {
          :tool_id => app.tool_id,
          :name => app.name,
          :score => 1
        }
      }
    end
    if apps.length < 5
      apps += App.all(:pending => false, :categories => self.categories, :tool_id.not => self.tool_id, :order => :name, :limit => 5).map{|app|
        {
          :tool_id => app.tool_id,
          :name => app.name,
          :score => 1
        }
      }
    end
    apps.uniq[0, 5]
  end

  def self.load_apps(filter=nil)
    allow_new = true if !filter
    lookups = ((filter && filter.settings) || {})['app_ids'] || {}
    allow_new = (filter.settings['allow_new'] || false) if filter
    anonymous_only = (filter.settings['anonymous_only'] || false) if filter
    data_apps = App.all(:pending => false, :settings.not => nil).select{|a| 
      a.settings && lookups[a.settings['id']] != false && (allow_new || lookups[a.settings['id']] == true) && (!anonymous_only || a.anonymous)
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
    app.anonymous = hash['privacy_level'] == 'anonymous'
    app.tool_id = hash['id']
    app.settings = hash
    app.save
    app
  end

end
