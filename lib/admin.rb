require 'sinatra/base'
require 'sanitize'

module Sinatra
  module Admin
    get "/admin" do
      admin_check
      erb :admin
    end
    
    get "/propose" do
      redirect to("/") unless session['user_key']
      erb :propose
    end
    
    get "/api/v1/admin/permissions" do
      admin_check
      @permissions = AdminPermission.all
      @permissions.map(&:as_json).to_json
    end
    
    delete "/api/v1/admin/permissions/:id" do
      admin_check
      @permission = AdminPermission.first(:id => params[:id])
      @permission.destroy
      @permission.to_json
    end
    
    post "/api/v1/admin/permissions" do
      admin_check
      @permission = AdminPermission.create(:username => params['username'], :apps => params['apps'])
      @permission.to_json
    end
    
    put "/api/v1/admin/permissions/:id" do
      admin_check
      @permission = AdminPermission.first(:id => params[:id])
      @permission.apps = params['apps']
      @permission.save
      @permission.to_json
    end
    
    post "/api/v1/apps" do
      return "An app with the id \"#{params['id']}\" already exists or has been proposed" if App.first(:tool_id => params['id'])
      unless App.first(:tool_id => params['id']).nil? && session['user_key']
        admin_check(params['id'])
      end
      @app = App.build_or_update(params['id'], params, true)
      @app.settings['author_name'] = session[:user_key]
      @app.settings['author_url'] = "https://twitter.com/#{session[:user_key]}"
      @app.save
      @app.to_json
      # redirect to("/index.html?tool=#{@app.tool_id}")
    end
    
    put "/api/v1/apps/:tool_id" do
      admin_check(params['tool_id'])
      @app = App.build_or_update(params['tool_id'], params, true)
      @app.to_json
      # redirect to("/index.html?tool=#{@app.tool_id}")
    end
    
    
    helpers do
      def admin_check(tool_id='any')
        permission = AdminPermission.first(:username => "@#{session['user_key']}")
        halt "No" unless permission && permission.allowed_access?(tool_id)
      end
      
      def data_view
        "admin"
      end
    end
  end 
  register Admin
end