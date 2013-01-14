require 'sinatra/base'
require 'sanitize'

module Sinatra
  module Admin
    get "/admin" do
      return redirect("/") unless session[:admin]
      erb :admin
    end
    
    get "admin/permissions" do
      return "No" unless session[:admin]
      @permissions = AdminPermission.all
      @permission.to_json
    end
    
    delete "/admin/permissions/:id" do
      return "No" unless session[:admin]
      @permission = AdminPermission.first(:id => params[:id])
      @permission.destroy
      @permission.to_json
    end
    
    post "/admin/permissions" do
      return "No" unless session[:admin]
      @permission = AdminPermission.new
      @permission.to_json
    end
    
    put "/admin/permissions/:id" do
      return "No" unless session[:admin]
      @permission = AdminPermission.first(:id => params[:id])
      @permission.update_attributes()
      @permission.to_json
    end
    
    helpers do
      def permission_json(permission)
        {}.to_json
      end
    end
  end 
  register Admin
end