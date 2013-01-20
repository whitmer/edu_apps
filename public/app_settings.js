$(function() {
  $(document).on('change', '#app_type', function() {
    $("#app_settings .control-group.app_type").hide()
      .filter("." + $(this).val()).show();
  });
  $(document).on('click', '.delete_field', function(event) {
    event.preventDefault();
    $(this).closest(".field").remove();
  });
  $(document).on('click', '#custom_fields .add_field', function(event) {
    event.preventDefault();
    var field = Handlebars.templates['custom_field']({});
    $("#custom_fields .fields").append(field);
  });
  $(document).on('click', '#config_urls .add_field', function(event) {
    event.preventDefault();
    var field = Handlebars.templates['config_url']({});
    $("#config_urls .fields").append(field);
  });
  $(document).on('click', '#config_options .add_field', function(event) {
    event.preventDefault();
    var field = Handlebars.templates['config_option']({});
    $("#config_options .fields").append(field);
    $("#config_options table").show();
  });
});
function manageApp(tool) {
  var admin_tool = JSON.parse(JSON.stringify(tool))
  admin_tool.all_levels = ["K-6th Grade", "7th-12th Grade", "Postsecondary"];
  admin_tool.all_categories = ["Community", "Content", "Math", "Media", "Open Content", "Science", "Study Helps", "Textbooks/eBooks", "Web 2.0"];
  admin_tool.all_extensions = ["course_nav", "user_nav", "account_nav", "editor_button", "resource_selection"];
  admin_tool.all_app_types = ["open_launch", "data"];
  lookups = {
    "launch_url": "/tools/" + admin_tool.id + "/index.html",
    "icon_url": "/tools/" + admin_tool.id + "/icon.png",
    "logo_url": "/tools/" + admin_tool.id + "/logo.png",
    "banner_url": "/tools/" + admin_tool.id + "/banner.png",
    "config": "/tools/" + admin_tool.id + "/config.xml",
    "icon_url": "/tools/" + admin_tool.id + "/icon.png"
  }
  for(var jdx in lookups) {
    if(admin_tool[jdx] == location.protocol + "//" + location.host + lookups[jdx]) {
      admin_tool[jdx] = null;
    }
  }
  if(admin_tool.preview && admin_tool.preview.url == "/tools/" + admin_tool.id + "/index.html") {
    admin_tool.preview = null;
  }
  admin_tool.config_url = null
  var html = Handlebars.templates['tool_admin'](admin_tool);
  $("#contents .row:last").append(html);
  $("#app_type").change();
}
