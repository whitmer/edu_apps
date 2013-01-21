$.getJSON("/api/v1/admin/permissions", function(data) {
  for(var idx in data) {
    var permission = data[idx];
    $("#admins tbody tr").filter(":last").before(Handlebars.templates['admin'](permission));
  }
});
function getApps(url, list_id) {
  $.getJSON(url, function(data) {
    for(var idx in data['objects']) {
      var app = data['objects'][idx];
      $(list_id + " tbody tr").filter(":last").before(Handlebars.templates['app_admin'](app));
    }
    if(data['meta'] && data['meta']['next']) {
      getApps(data['meta']['next'], list_id);
    }
  });
}
getApps("/api/v1/apps", "#apps");
getApps("/api/v1/apps?pending=1", "#pending_apps");
$(".add_admin").click(function() {
  $.ajax({
    url: "/api/v1/admin/permissions",
    dataType: "json",
    type: "POST",
    data: {
      'username': $("#username").val(),
      'apps': $("#allowed_apps").val()
    },
    success: function(data) {
      $("#admins tbody tr").filter(":last").before(Handlebars.templates['admin'](data));
    },
    error: function() {
      alert("Error!");
    }
  });
});
$("#admins").on('click', '.update_admin', function(event) {
  event.preventDefault();
  var $admin = $(event.target).closest("tr");
  $.ajax({
    url: $admin.attr('rel'),
    dataType: "json",
    type: "POST",
    data: {
      '_method': 'PUT',
      'apps': $admin.find(".apps").val()
    },
    success: function(data) {
      $admin.before(Handlebars.templates['admin'](data));
      $admin.remove();
    },
    error: function() {
      alert("Error!");
    }
  });
});
$("#admins").on('click', '.delete_admin', function(event) {
  var result = confirm("Delete this admin? Forever and stuff?");
  if(!result) { return; }
  var $admin = $(event.target).closest("tr");
  $.ajax({
    url: $admin.attr('rel'),
    dataType: "json",
    type: "POST",
    data: {
      '_method': 'DELETE'
    },
    success: function(data) {
      $admin.remove();
    },
    error: function() {
      alert("Error!");
    }
  });
});
