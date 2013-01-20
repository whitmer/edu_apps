(function() {
  Handlebars.partials = Handlebars.templates;
  if(location.href.match(/http:\/\/lti-examples\.heroku\.com/)) {
    location.href = location.href.replace(/^http/, 'https')
  }
  var visible_tools = [];
  var extensions = {
    'editor_button': "rich editor",
    'course_nav': "course navigation"
  };
  var grade_levels = {};
  var categories = {};
  $("#preview").live('click', function() {
    var tool = visible_tools[0];
    $(".preview_pane").remove();
    var preview = Handlebars.templates['tool_preview'](tool);
    $(".config").after(preview);
  });
  $(".config_option").live('change keyup', function() {
    $(".config_field").each(function() {
      if(!$(this).attr('rel')) {
        $(this).attr('rel', $(this).val());
      }
      var url = $(this).attr('rel');
      var append = url.match(/\?/) ? "&" : "?";
      $(".config_option").each(function() {
        if($(this).attr('type') != 'checkbox' || $(this).attr('checked')) {
          append = append + encodeURIComponent($(this).attr('name')) + "=" + encodeURIComponent($(this).val()) + "&";
        }
      });
      append = append.substring(0, append.length - 1);
      $(this).val(url + append);
    });
  });
  var args = (location.href.split(/#/)[0].split(/\?/)[1] || "").split(/\&/);
  var params = {}
  for(var idx in args) {
    var arg = args[idx].split(/\=/);
    var key = arg[0];
    var value = arg[1];
    if(key && value) {
      params[key] = decodeURIComponent(value);
    }
  }
  $("img.star").live('mouseover', function() {
    if(window.user_key && params.tool) {
      var $parent = $(this).parent();
      if(!$parent.data('original_class')) {
        $parent.data('original_class', $parent.attr('class'));
      }
      $parent.attr('class', 'stars ' + $(this).attr('class'));
    }
  }).live('mouseout', function() {
    var $parent = $(this).parent();
    $parent.attr('class', $parent.data('original_class'));
  }).live('click', function() {
    if(window.user_key) {
      var star = $(this).attr('data-star');
      $(".stars").attr('class', 'stars star' + star).data('original_class', 'stars star' + star);
      $("#add_rating").slideDown(function() {
        $("#rating_comments").focus();
      });
      $("#rating_star").val(star);
      $.ajax({
        type: 'POST',
        url: '/api/v1/apps/' + params.tool + '/reviews',
        data: {
          rating: star
        },
        dataType: 'json',
        success: function(data) {
          addComment(data, true);
        }
      });
    }
  });
  $(".btn-cancel").live('click', function() {
    $("#add_rating").slideUp();
  });
  $("#add_rating").live('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $.ajax({
        type: 'POST',
        url: '/api/v1/apps/' + params.tool + '/reviews',
        data: {
          rating: $("#rating_star").val(),
          comments: $("#rating_comments").val()
        },
        dataType: 'json',
        success: function(data) {
          addComment(data, true);
          $("#add_rating").slideUp();
        }
    });
  });
  $("#category,#level").live('change', filterTools);
  if(params.tool) {
    $.getJSON('/api/v1/apps/' + params.tool, function(data) {
      toolsReady([data]);
    });
  } else {
    var tools = [];
    var url = '/api/v1/apps';
    function moreTools() {
      if(url) {
        $.getJSON(url, function(data) {
          tools = tools.concat(data['objects']);
          url = data['meta'] && data['meta']['next'];
          moreTools();
        });
      } else {
        toolsReady(tools);
      }
    }
    moreTools();
  }
  function filterTools() {
    var tools = visible_tools;
    var category = $("#category").val();
    var level = $("#level").val();
    $("#contents").empty();
    var mod = 0;
    var $div = null;
    filterTools.appCount = 0;
    for(var idx = 0; idx < tools.length; idx++) {
      var tool = tools[idx];
      if(category == "recent" && !tool['recent']) {
        continue;
      }
      if(category != "all" && category != "recent" && !(tool.categories || []).join(" ").match(category)) {
        continue;
      }
      if(level != "all" && !(tool.levels || []).join(" ").match(level)) {
        continue;
      }
      filterTools.appCount++;
      if(tool.categories) {
        for(var jdx in tool.categories) {
          categories[tool.categories[jdx]] = true;
        }
      }
      var refUrl = location.protocol + "//" + location.host + "/index.html?tool=" + tool.id;
      tool.refUrl = refUrl;
      tool.single_tool = tools.length == 1;
      tool.extensions_or_preview = tool.extensions || tool.preview;
      tool.config_details = tools.length == 1 || tool.extensions || tool.preview;
      tool.show_votes = tools.length == 1 || params['show_votes'];
      tool.description = (tools.length == 1 ? tool.description : tool.description.split(/<br/)[0]);
      tool.has_config_url = tool.config_url || tool.config_urls;
      if(tool.any_key && tools.length == 1) {
        tool.description = tool.description + "<br/><br/>Any key and secret will work for this app.";
      }
      tool.desc = new Handlebars.SafeString(tool.description);
      tool.config_dir = new Handlebars.SafeString(tool.config_directions);
      tool.user_key = window.user_key;
      html = Handlebars.templates['tool'](tool);
      if(mod == 0) {
        $div = $("<div/>", {'class': 'row'});
        $("#contents").append($div);
      }
      var $tool = $(html).data('tool', tool);
      $div.append($tool);
      if(tools.length == 1) {
        // add ratings and comments
        $(".app .config").css('visibility', 'visible');
        $("title,h1").text(tools[0].name);
        if(($.store.get('admin') || ($.store.get('apps') && $.store.get('apps').indexOf(tool.id) > -1)) && window.manageApp) {
          window.manageApp(tool);
        }
      }
      mod = (mod + 1) % 4;
    }
    $("#visible_app_count").text(filterTools.appCount);
  }
  function toolsReady(tools) {
    var url = location.href;
    var refUrl = "";
    if(params.tool) {
      var tool = null;
      for(var idx = 0; idx < tools.length; idx++) {
        if(tools[idx].id == params.tool) {
          tool = tools[idx];
        }
      }
      if(tool) {
        tools = [tool];
      }
    }
    
    var newest_tools = tools.sort(function(a, b) {
      if(a.added > b.added) {
        return -1;
      } else if(a.added < b.added) {
        return 1;
      } else {
        return 0;
      }
    });
    for(var jdx = 0; jdx < newest_tools.length; jdx++) {
      if(newest_tools[jdx]['new'] || jdx < 12) {
        newest_tools[jdx].recent = true;
      }
    }
    visible_tools = tools.sort(function(a, b) {
      if((a.uses || 0) > (b.uses || 0)) {
        return -1;
      } else if((a.uses || 0) < (b.uses || 0)) {
        return 1;
      } else {
        if(a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if(a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    
    filterTools();
    var categories_list = [];
    for(var idx in categories) {
      categories_list.push(idx);
    }
    
    if(tools.length > 1) {
      categories_list = categories_list.sort();
      var levels_list = ["K-6th Grade", "7th-12th Grade", "Postsecondary"];
      var header = Handlebars.templates['tools_header']({categories: categories_list, levels: levels_list});
      $("#contents").before(header);
      $("#visible_app_count").text(filterTools.appCount);
    }
    
    if(tools.length == 1 || params['show_votes']) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://apis.google.com/js/plusone.js';
      script.async = true;
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//platform.twitter.com/widgets.js';
      script.async = true;
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);
    }
    if(tools.length == 1 && tools[0].comments_count) {
      $.getJSON('/api/v1/apps/' + params.tool + '/reviews', function(data) {
        addComments(data['objects']);
      });
      $.getJSON('/api/v1/apps/' + params.tool + '/reviews?for_current_user=1', function(data) {
        addComments(data['objects'], true);
      });
    }
    $(".config_option").change();
    if(location.hash == '#preview') {
      $("#preview").click();
    }
  }
  var $comments = null;
  function addComments(comments) {
    for(var idx = 0; idx < comments.length; idx++) {
      addComment(comments[idx]);
    }
  }
  function addComment(comment, addToTop) {
    if(!$comments) {
      $comments = $("<div/>");
      $(".ratings").append($comments);
    }
    if(addToTop) {
      // get latest app data, update stars and counts everywhere
    }
    var comment_html = Handlebars.templates['comment'](comment);
    var $comment = $("#comment_" + comment.id);
    if(addToTop) {
      $comments.prepend(comment_html);
    } else if($comment.length) {
      $comment.after(comment_html);
    } else {
      $comments.append(comment_html);
    }
    $comment.remove();
  }
  $(".config_field").live('click focus mouseup', function() {
    var $obj = $(this);
    setTimeout(function() {
      $obj.select();
    }, 50);
  });
  $(document).ready(function() {
    $(".works_in").tooltip();
  });
  
})();
