(function() {
  var searchMode = "tools";
  var tools = [];
  var toolsHash = {};
  var maxRecentTools = 6;
  $.getJSON('/data/lti_examples.json', function(data) {
    for(var idx = 0; idx < data.length; idx++) {
      if(data[idx].data_url || data[idx].launch_url) {
        tools.push(data[idx]);
        toolsHash[data[idx].id] = data[idx];
      }
    }
    searchTools();
    if(lti.params['tool']) {
      launchTool(lti.params['tool']);
    }
  });
  var $message = $("#message"),
      $tools = $("#tools"),
      $launch = $("#launch"),
      $form = $("#search"),
      $query = $("#query"),
      $logo = $("#logo"),
      $back = $("#back"),
      $collection_name = $("#collection_name"),
      $resources = $("#resources");
  function search() {
    searchMode == "tools" ? searchTools() : searchResources();
  }
  function launchTool(id) {
    if(trackEvent) {
      trackEvent('launch_from_tools', id, location.href);
    }
    var recent = $.store.get('recent_tools') || [];
    recent.unshift(id);
    var recentHash = {};
    var newRecent = []
    for(var idx = 0; idx < recent.length; idx++) {
      if(!recentHash[recent[idx]]) {
        recentHash[recent[idx]] = true;
        newRecent.push(recent[idx]);
      }
    }
    $.store.set('recent_tools', newRecent.slice(0, maxRecentTools));
    
    var tool = toolsHash[id];
    $collection_name.text(tool.name);
    if(tool.launch_url) {
      location.href = tool.launch_url + "?selection_directive=embed_content&custom_lti_back_button=" + (lti.params['tool'] ? '' : '1') + "&launch_presentation_return_url=" + encodeURIComponent(lti.returnUrl);
    } else {
      $tools.hide();
      $back.toggle(!lti.params['tool']);
      $logo.attr('src', tool.image_url);
      searchMode = "resources";
      $resources.show();
      $resources.data('tool', tool);
      $query.val("");
      $query.attr('disabled', false);
      if(tool.resources) {
        search();
      } else {
        $resources.html("Loading...");
        $query.attr('disabled', true);
        $.ajax({
          url: tool.data_url,
          success: function(data) {
            $query.attr('disabled', false);
            tool.resources = data;
            search();
          },
          dataType: 'json'
        });
      }
    }
  }
  function searchTools() { 
    $message.hide();
    $resources.hide();
    $launch.hide();
    $tools.show();
    $collection_name.text("Collections");
    var query = $query.val();
    var matches = [];
    for(var idx = 0; idx < tools.length; idx++) {
      var tool = $.extend({}, tools[idx]);
      var re = new RegExp(query, "i");
      var name_idx = (tool.name || "").search(re);
      var desc_idx = (tool.short_description || "").search(re);
      var rank = query == "" ? 0 : -1;
      if(name_idx > -1) { rank = name_idx; }
      else if(desc_idx > -1) { rank = desc_idx + 500; }
      tool.rank = rank;
      tool.position = idx;
      if(tool.rank > -1 && !tool.exclude_from_public_collections) { 
        matches.push(tool);
      }
    }
    if(matches.length == 0) {
      $tools.hide();
      $message.show().text(tools.length == 0 ? "Loading..." : "No Results Found");
    }
    matches = matches.sort(function(a, b) {
      return [a.rank - b.rank, a.position - b.position];
    });
    $tools.empty();
    var recent = $.store.get('recent_tools') || [];
    if(recent.length && tools.length && !query.length) {
      var $div = $("<div/>", {'class': 'recent well'});
      $div.append("<h3>Recent:</h3>");
      for(var idx = 0; idx < recent.length; idx++) {
        var tool = toolsHash[recent[idx]];
        if(tool) {
          var $img = $("<img/>", {'src': tool.image_url, 'title': tool.name, 'class': 'recent_tool', 'data-id': tool.id})
          $div.append($img);
        }
      }
      $tools.append($div);
    }
    $tools.find(".recent_tool").tooltip();
    for(var idx = 0; idx < matches.length; idx++) {
      var tool = matches[idx];
      var $tool = $("<div/>", {'class': 'tool'}).append(
        $("<img/>", {src: tool.image_url, 'class': 'logo'})).append(
        $("<span/>", {'class': 'name'}).text(tool.name)).append(
        $("<span/>", {'class': 'description'}).text(tool.short_description));
      $tool.data('tool', tool);
      $tool.click(function() {
        var tool = $(this).data('tool');
        launchTool(tool.id);
      });
      $tools.append($tool);
    }
  }
  $tools.delegate('.recent_tool', 'click', function(event) {
    launchTool($(this).attr('data-id'));
  });
  $resources.delegate('.single_resource .link', 'click', function(event) {
    var resource = $(this).closest(".resource").data('resource');
    var refs = $(this).attr('data-index').split(',');
    var link = resource.links[refs[0]].links[refs[1]];
    if(link.url) {
      lti.resourceSelected({
        embed_type: 'link',
        url: link.url,
        text: link.name
      });
    } else if(link.html) {
      var oembedUrl = location.protocol + "//" + location.host + "/oembed";
      var url = oembedUrl + "?code=" + encodeURIComponent(link.html);
      lti.resourceSelected({
        embed_type: 'oembed',
        endpoint: oembedUrl,
        url: url
      });
    }
  });
  $resources.delegate('.resource', 'click', function(event) {
    if($(event.target).hasClass('preview')) { return; }
    event.preventDefault();
    if(($(this).hasClass('single_resource') && !$(event.target).hasClass('name'))) { return; }
    var resource = $(this).data('resource');
    if(resource.links && !$(this).hasClass('single_resource')) {
      var $resource = $(this).detach().addClass('single_resource');
      $resource.find(".name").html("<a href='" + resource.url + "' class='name_link'>" + resource.name + "</a>");
      var $well = $("<div/>", {'class': 'well'});
      for(var idx = 0; idx < resource.links.length; idx++) {
        var links = resource.links[idx];
        var $content = "<ul class='nav nav-list'><li class='nav-header'>" + links.name + "</li>";
        for(var jdx = 0; jdx < links.links.length; jdx++) {
          var link = links.links[jdx];
          $content = $content + "<li class='link' data-index='" + idx + "," + jdx + "'>";
          $content = $content + "<a href='" + link.url + "'>";
          if(link.image_url) {
            $content = $content + "<img src='" + link.image_url + "' class='img_preview' alt=''/>";
          } else if(link.icon) {
            $content = $content + "<span class='" + link.icon + "'></span>&nbsp;";
          }
          $content = $content + link.name + "</a></li>";
        }
        $content = $content + "</ul>";
        $well.append($content);
      }
      $resource.append($well);
      $resources.empty().append($resource);
    } else if(resource.iframe) {
      lti.resourceSelected({
        embed_type: 'iframe',
        url: resource.iframe.url,
        width: resource.iframe.width,
        height: resource.iframe.height
      });
    } else if(resource.url) {
      lti.resourceSelected({
        embed_type: 'link',
        url: resource.url,
        text: resource.name
      });
    } else if(resource.html) {
      var oembedUrl = location.protocol + "//" + location.host + "/oembed";
      var url = oembedUrl + "?code=" + encodeURIComponent(resource.html);
      lti.resourceSelected({
        embed_type: 'oembed',
        endpoint: oembedUrl,
        url: url
      });
    }
  });
  function searchResources() {
    d = new Date();
    $message.hide();
    $resources.show();
    $launch.hide();
    $tools.hide();
    var query = $query.val();
    var tool = $resources.data('tool');
    var $holder = $("<div/>");
    $collection_name.text(tool.name);
    var matches = [];
    var filler = [];
    var re = new RegExp(query, "i");
    for(var idx = 0; idx < tool.resources.length; idx++) {
      var resource = $.extend({}, tool.resources[idx]);
      var name_idx = (resource.name || "").search(re);
      var desc_idx = (resource.description || "").search(re);
      var rank = query == "" ? 0 : -1;
      if(name_idx > -1) { rank = name_idx; }
      else if(desc_idx > -1) { rank = desc_idx + 500; }
      resource.rank = rank;
      if(resource.rank > -1) { 
        matches.push(resource);
      }
    }
    if(matches.length == 0) {
      $tools.hide();
      $resources.hide();
      $message.show().text("No Results Found");
    }
    matches = matches.sort(function(a, b) {
      return a.rank - b.rank;
    });
    $resources.empty();
    d3 = new Date();    
    for(var idx = 0; idx < matches.length && idx < 500; idx++) {
      var resource = matches[idx];
      if(resource.links) {
        var linkCount = 0;
        for(var jdx = 0; jdx < resource.links.length; jdx++) {
          linkCount = linkCount + resource.links[jdx].links.length;
        }
        resource.description = "<span class='link_count'>" + linkCount + " link" + (linkCount == 1 ? "" : "s") + "</span><br/>" + resource.description;
      }
      var $resource = $("<div/>", {'class': 'resource'})
      var $content = "<div class='name'>" + resource.name + "</div>";
      $content = $content + "<div class='content'>";
      if(resource.image_url) {
        $content = $content + "<div class='img_holder'><img src='" + resource.image_url + "' class='img'/></div>";
      }
      $content = $content + "<span class='description'>" + resource.description + "</span>";
      if(resource.url) {
        $content = $content + "<a href='" + resource.url + "' class='preview' target='_blank'>preview</a>";
      }
      $content = $content + "</div>";
      if(idx > 20) {
        filler.push([$resource, $content]);
      } else {
        $resource.html($content);
      }
      $resource.addClass(resource.resource_class || '');
      $resource.data('resource', resource);
      $holder.append($resource);
    }
    $resources.append($holder);
    if(matches.length > 500) {
      $resources.append("<div style='clear: both;'>Too many results, only 500 shown</div>");
    }
    function fill(list) {
      for(var i = 0; i < 5; i++) {
        if(list.length > 0) {
          item = list.shift();
          item[0].html(item[1]);
        }
      }
      if(list.length > 0) {
        setTimeout(function() {
          fill(list);
        }, 100);
      }
    }
    fill(filler);
  }
  $(document).ready(function() {
    searchTools();
    $back.click(function(event) {
      event.preventDefault();
      if($("#resources .single_resource").length) {
        searchResources();
        return;
      }
      $tools.show();
      $back.hide();
      $logo.attr('src', $logo.attr('rel'));
      $launch.hide();
      $collection_name.text("Collections");
      $resources.hide();
      searchMode = "tools";
      $query.val("");
      search();
    });
    $form.submit(function(event) {
      event.preventDefault();
      event.stopPropagation();
      search();
    });
    $query.bind('keyup', search);
  });
})();