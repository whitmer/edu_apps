require 'sinatra/base'
require 'digest/md5'

module Sinatra
  module CustomLaunches
    post "/titanpad" do
      return "invalid parameters" unless params['context_id'] && params['resource_link_id']
      str = "#{params['context_id']}-#{params['resource_link_id']}"
      redirect to("http://titanpad.com/lti-" + Digest::MD5.hexdigest(str) + "?fullScreen=1&displayName=#{CGI.escape(params['lis_person_name_full'] || '')}")
    end
    
    post "/bumpin" do
      return "invalid parameters" unless params['context_id'] && params['resource_link_id']
      str = "#{params['context_id']}-#{params['resource_link_id']}"
      redirect to("/bumpin/room/#{str}?name=#{params['lis_person_name_full']}")
    end
    
    get "/bumpin/room/:ids" do
      return <<-HTML
      <html>
      <body>
        <script type="text/javascript" src="http://www.bumpin.com/web_widget/users/swfobject.js"></script>
        <script type="text/javascript" src="http://www.bumpin.com/web_widget/users/bar/jquery-1.3.2.min.js"></script>
        <script type="text/javascript" src="http://www.bumpin.com/new_web_widget/widget.js"></script>
        <div id="bumpin-embedded-div" style="width:800px;"><div id="bumpin-widget"></div><div id="bumpin-link-div">
        <a target="_blank" href="http://www.ticketmy.com/bumpin/index.php">Shoutbox</a>
        </div></div>
        <script>window.onload =function(){loadNewBumpinWidget({ height: "500", width: "800", language: "English", color_string: "", color_theme: "default", enable_login: "false", bumpin_policy: "page", bumpin_url: "", widget_title: "Chat Room", enable_guest_login: "true", show_people_list: "true", enable_sound: "false", nick_name: "#{params['name']}" });}</script>
      </body>
      </html>
    HTML
    end
    
  end 
  register CustomLaunches
end