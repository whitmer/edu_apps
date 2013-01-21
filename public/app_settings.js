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
  $(document).on('submit', '#app_settings', function(event) {
    event.preventDefault();
    var args = {};
    var array = $(event.target).seralizeArray();
    for(var idx in array) {
      args[array[idx]['name']] = array[idx]['value'];
    }
    $.ajax({
      url: $(event.target).attr('action'),
      type: "POST",
      data: args,
      dataType: 'json',
      success: function(data) { 
        if(location.href.match(/suggestions/)) {
          alert("Submitted! Thank you!");
          location.href = "/";
        } else {
          window.reload();
        }
      },
      error: function() {
        alert("Error!");
      }
    });
  });
});
function manageApp(tool) {
  $.ajax({
    url: "/api/v1/app_categories",
    dataType: "json",
    type: "GET",
    success: function(data) {
      manageAppFrd(tool, data);
    },
    error: function() {
      $("#contents .row:last").append("<h2 class='offset1 span9'>There was a problem loading the app data</h2>");
    }
  });
}
function manageAppFrd(tool, categories) {
  var admin_tool = JSON.parse(JSON.stringify(tool));

  admin_tool.all_levels = categories.levels;
  admin_tool.all_categories = categories.categories;
  admin_tool.all_extensions = categories.extensions;
  admin_tool.all_app_types = categories.app_types;
  admin_tool.admin = $.store.get('admin');
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
