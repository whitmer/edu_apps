require 'sinatra/base'

module Sinatra
  module TwitterLogin
    # list all the apps
    get "/login" do
      request_token = consumer.get_request_token(:oauth_callback => "#{request.scheme}://#{request.host_with_port}/login_success")
      if request_token.token && request_token.secret
        session[:oauth_token] = request_token.token
        session[:oauth_token_secret] = request_token.secret
      else
        return "Authorization failed"
      end
      redirect to("https://api.twitter.com/oauth/authenticate?oauth_token=#{request_token.token}")
    end
    
    get "/login_success" do
      verifier = params[:oauth_verifier]
      if params[:oauth_token] != session[:oauth_token]
        return "Authorization failed"
      end
      request_token = OAuth::RequestToken.new(consumer,
        session[:oauth_token],
        session[:oauth_token_secret]
      )
      access_token = request_token.get_access_token(:oauth_verifier => verifier)
      
      if !access_token.params['screen_name']
        return "Authorization failed"
      end
      session[:oauth_token] = nil
      session[:oauth_token_secret] = nil
      session[:user_key] = access_token.params['screen_name']
      permission = AdminPermission.first(:username => "@#{session[:user_key]}")
      session[:admin] = permission && permission.apps == "any"
      session[:apps] = permission.apps
      
      redirect to("/index.html?logged_in")
    end
    
    get "/logout" do
      session.clear
      redirect to("/")
    end
    
    get "/user_key.json" do
      suggestions_config = ExternalConfig.first(:config_type => 'suggestions_form')
      {
        :user_key => session[:user_key],
        :suggestions => !!suggestions_config,
        :admin => session[:admin],
        :apps => session[:apps]
      }.to_json
    end
    
    
    helpers do
      def consumer
        consumer ||= OAuth::Consumer.new(twitter_config.value, twitter_config.secret, {
          :site => "http://api.twitter.com",
          :request_token_path => "/oauth/request_token",
          :access_token_path => "/oauth/access_token",
          :authorize_path=> "/oauth/authorize",
          :signature_method => "HMAC-SHA1"
        })
      end
      
      def twitter_config
        @@twitter_config ||= ExternalConfig.first(:config_type => 'twitter_for_login')
      end
    end
  end
  register TwitterLogin
end

