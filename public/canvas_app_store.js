  $(document).ready(function() {
  var host = "https://lti-examples.heroku.com";
  var lastCategory = $.store.get('last_external_tool_category');
  var lastLevel = $.store.get('last_external_tool_level');
  $(".add_tool_link").html("Add a Custom External Tool").parent().css('textAlign', 'right');
  var $tools = $("#external_tools");
  if($tools.length) {
    $tools.hide();
    var $content = $("<div/>", {'id': 'app_list'});
    $("head").append("<link href='" + host + "/canvas_app_store.css' media='all' rel='stylesheet' type='text/css' />");
    $content.html("Loading...");
    $.ajax({
      url: host + "/data/lti_examples.jsonp",
      success: function(data) {
        var tools = [];
        var categories = [], levels = [];
        data = data.sort(function(a, b) {
          var diff = (b.uses || 0) - (a.uses || 0);
          if(diff == 0) {
            if(a.name < b.name) {
              return -1;
            } else if(a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          } else {
            return diff;
          }
        });
        for(var idx = 0; idx < data.length; idx++) {
          var tool = data[idx];
          tool.uses = tool.uses || 0;
          tool.description = tool.description || tool.short_description;
          if(tool.data_url && tool.icon_url) {
            tool.config_url = "/config/data_tool.xml?id=" + tool.id + "&name=" + encodeURIComponent(tool.name) + "&icon_url=" + encodeURIComponent(host + tool.icon_url) + "&description=" + encodeURIComponent(tool.description);
            tool.any_key = true;
          }
          if(tool.config_url && !tool.pending && tool.id != 'bumpin') {
            tools.push(tool);
            if(tool.categories) {
              for(var jdx = 0; jdx < tool.categories.length; jdx++) {
                categories.push(tool.categories[jdx]);
              }
            }
            if(tool.levels) {
              for(var jdx = 0; jdx < tool.levels.length; jdx++) {
                levels.push(tool.levels[jdx]);
              }
            }
          }
        }
        categories = $.uniq(categories).sort();
        levels = $.uniq(levels);
        var $category_select = $("<select/>", {'class': 'filter', 'id': 'category_filter'});
        var $level_select = $("<select/>", {'class': 'filter'});
        $category_select.append($("<option/>", {'value': 'all'}).text("All Categories"));
        $level_select.append($("<option/>", {'value': 'all'}).text("All Grade Levels"));
        for(var idx = 0; idx < categories.length; idx++) {
          $category_select.append($("<option/>", {'value': categories[idx]}).text(categories[idx]));
        }
        $category_select.append($("<option/>", {'value': 'installed'}).text("Installed Tools"));
        for(var idx = 0; idx < levels.length; idx++) {
          $level_select.append($("<option/>", {'value': levels[idx]}).text(levels[idx]));
        }
        function reFilter() {
          var category = $category_select.val();
          var level = $level_select.val();
          $.store.set('last_external_tool_category', category);
          $.store.set('last_external_tool_level', level);
          $level_select.show();
          $content.find(".overlay").removeClass('show');
          $content.find(".tools").show();
          $("#external_tools").hide();
          if(category == 'installed') {
            $level_select.hide();
            $content.find(".tools").hide();
            $("#external_tools").show();
          }
          $content.find(".tool").hide().each(function() {
            var tool = $(this).data('tool');
            var match = true;
            if(category != 'all' && $.inArray(category, tool.categories) == -1) {
              match = false;
            }
            if(level != 'all' && $.inArray(level, tool.levels) == -1) {
              match = false;
            }
            if(match) { $(this).show(); }
          });
        }
        $category_select.val(lastCategory).change(reFilter);
        $level_select.val(lastLevel).change(reFilter).change();
        
        $content.empty().append("<div class='overlay'>bacon</div>Filter: ").append($category_select).append("&nbsp;").append($level_select);
        var $tools = $("<div/>", {'class': 'tools'});
        $content.append($tools);
        for(var idx = 0; idx < tools.length; idx++) {
          var tool = tools[idx];
          var $tool = $("<div/>", {'class': 'tool'});
          $tool.html("<div style='text-align: center;'><img src='" + host + tool.big_image_url + "'/></div>");
          $tool.append("<div class='details'><span class='name'>" + tool.name + "</span><div style='float: right;'>" + (tool.uses || "0") + " hits/month</div><div class='desc'>" + tool.description.split(/<br\/>/)[0] + "</div></div>");
          $tool.data('tool', tool);
          $tools.append($tool);
        }
        $tools.append("<div style='clear: left;'></div>");
        
        $category_select.change();
      },
      dataType: 'jsonp'
    });
    $tools.before($content);
    $content.delegate('.cancel', 'click', function(event) {
      $content.find(".overlay").removeClass('show');
    });
    $content.delegate('.add', 'click', function(event) {
      var $button = $(this);
      var $overlay = $content.find(".overlay");
      var tool = $overlay.data('tool');
      var url = tool.config_url;
      if($overlay.find("#base_url").length) {
        url = $overlay.find("#base_url").val();
      }
      if(!url.match(/^http/)) {
        url = host + url;
      }
      var append = url.match(/\?/) ? "&" : "?";
      $(".config_option").each(function() {
        if($(this).attr('type') != 'checkbox' || $(this).attr('checked')) {
          append = append + encodeURIComponent($(this).attr('name')) + "=" + encodeURIComponent($(this).val()) + "&";
        }
      });
      append = append.substring(0, append.length - 1);
      url = url + append;
      var $key = $overlay.find(".consumer_key");
      var $secret = $overlay.find(".secret");
      if($key.length && !$.trim($key.val())) {
        $key.errorBox("This field is required").css('zIndex', 999);
        return;
      }
      if($secret.length && !$.trim($secret.val())) {
        $secret.errorBox("This field is required").css('zIndex', 999);
        return;
      }
      var key = $key.val() || "key";
      var secret = $secret.val() || "secret";
      var postUrl = $(".external_tools_url").attr('href');
      var originalTool = tool;
      var params = {
        'external_tool[consumer_key]': key,
        'external_tool[shared_secret]': secret,
        'external_tool[config_type]': 'by_url',
        'external_tool[config_url]': url
      }
      $overlay.find("button").attr('disabled', true);
      $button.html("<img src='/images/add.png'/> Adding Tool...");
      $.ajaxJSON(postUrl, 'POST', params, function(tool) {
        var $tool = $("#external_tool_blank").clone(true).removeAttr('id');
        $("#external_tools").append($tool);
        $tool.fillTemplateData({
          data: tool,
          dataValues: ['id', 'workflow_state'],
          hrefValues: ['id'],
          id: 'external_tool_' + tool.id
        });
        $tool
          .toggleClass('has_editor_button', tool.has_editor_button)
          .toggleClass('has_resource_selection', tool.has_resource_selection)
          .toggleClass('has_course_navigation', tool.has_course_navigation)
          .toggleClass('has_user_navigation', tool.has_user_navigation)
          .toggleClass('has_account_navigation', tool.has_account_navigation);
        $tool.find(".tool_url").showIf(tool.url).end()
          .find(".tool_domain").showIf(tool.domain);
        $tool.show();
        $.flashMessage(originalTool.name + " Successfully Added!");
        $content.find(".overlay").removeClass('show');
      }, function() {
        $overlay.find("button").attr('disabled', false);
        $button.html("<img src='/images/add.png'/> Adding Failed");
      });
      console.log(url);
    });
    $content.delegate('.tool', 'click', function(event) {
      var tool = $(this).data('tool');
      if($(event.target).closest('a').length) { return; }
      var $overlay = $content.find(".overlay")
      $overlay.html("<div class='logo'><img src='" + host + tool.big_image_url + "'/></div><h2>" + tool.name + "</h2><div class='desc'>" + tool.description + "</div><div style='clear: left;'></div>");
      $overlay.data('tool', tool);
      if(!tool.any_key) {
        var $div = $("<div/>", {'class': 'option'});
        $div.append("Consumer Key: <input type='text' class='consumer_key' style='width: 100px;'/>");
        $overlay.append($div);
        
        var $div = $("<div/>", {'class': 'option'});
        $div.append("Shared Secret: <input type='text' class='secret' style='width: 100px;'/>");
        $overlay.append($div);
      }
      if(tool.config_options) {
        for(var idx = 0; idx < tool.config_options.length; idx++) {
          var $div = $("<div/>", {'class': 'option'});
          var option = tool.config_options[idx];
          if(option.type == "checkbox") {
            $div.append("<label><input type='checkbox' class='config_option' name='" + option.name + "' value='" + option.value + "'/> " + option.description + "</label>");
          } else if(option.type == "text") {
            $div.append("<label>" + option.description + ": <input type='text' class='config_option' name='" + option.name + "' value='" + option.value + "'/></label>");
          }
          
          $overlay.append($div);
        }
      }
      if(typeof(tool.config_url) != 'string') {
        var $select = $("<select/>", {id: 'base_url'});
        for(var idx = 0; idx < tool.config_url.length; idx++) {
          $select.append($("<option/>", {'value': tool.config_url[idx].url}).text(tool.config_url[idx].description));          
        }
        var $div = $("<div/>", {'class': 'option'}).append("Resource: ").append($select);
        $overlay.append($div);
      }
      var context_name = $("#current_context_code").text().match(/account/) ? "Account" : "Course";
      $overlay.append("<div style='margin: 10px 0;'><button class='button add'><img src='/images/add.png'/> Add This Tool to your " + context_name + "</button><button class='button button-secondary cancel'>Cancel</button></div>");
      $overlay.addClass('show');
    });
  }
});