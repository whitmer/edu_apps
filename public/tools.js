(function() {
  var searchMode = "tools";
  var tools = [
    {
      name: "Khan Academy",
      logo_url: "/tools/khan.png",
      description: "Online video lessons for math, science, etc.",
      markets: "",
      launch_url: "/khan.html"
    },
    {
      name: "TED Ed",
      logo_url: "/tools/ted_ed.png",
      description: "Online instructional videos",
      markets: "",
      launch_url: "/ted_ed.html"
    },
    {
      name: "MIT OCW",
      logo_url: "/tools/mit_ocw.png",
      description: "OCW lectures, videos, etc. from MIT",
      markets: "",
      data_url: "/data/mit_ocw.json"
    },
    {
      name: "Slideshare",
      logo_url: "/tools/slideshare.png",
      description: "Creative Commons-licensed presentations",
      markets: "",
      launch_url: "/slideshare.html"
    },
    {
      name: "USA Today",
      logo_url: "/tools/usa_today.png",
      description: "Articles from USA Today",
      markets: "",
      launch_url: "/usatoday.html"
    },
    {
      name: "Flat World Knowledge",
      logo_url: "/tools/flat_world_knowledge.png",
      description: "Free, open online textbooks",
      markets: "",
      data_url: "/data/flat_world_knowledge.json"
    },
    {
      name: "Graph Builder",
      logo_url: "/tools/graph_tk.png",
      description: "Build and embed rich interactive graphs into course content",
      markets: "",
      launch_url: "/graph.html"
    },
    {
      name: "Quizlet Flash Cards",
      logo_url: "/tools/quizlet.png",
      description: "Flash card and study help tools",
      markets: "",
      launch_url: "/quizlet.html"
    },
    {
      name: "Codecademy",
      logo_url: "/tools/codecademy.png",
      description: "Interactive programming lessons",
      markets: "",
      data_url: "/data/codecademy.json"
    },
    {
      name: "Elementary Paper",
      logo_url: "/tools/elementary_paper.png",
      description: "Browse printable writing practice sheets",
      markets: "",
      data_url: "/data/elem_paper.json"
    },
    {
      name: "SoftChalk Connect",
      logo_url: "/tools/softchalk.png",
      description: "Reusable content built using SoftChalk Connect",
      markets: "",
      data_url: "/data/softchalk.json"
    },
    {
      name: "BrainPOP",
      logo_url: "/tools/brainpop.png",
      description: "Online interactive lessons, quizzes, activities",
      markets: "",
      data_url: "/data/brainpop.json"
    },
    {
      name: "Hooda Math",
      logo_url: "/tools/hooda_math.png",
      description: "Online math learning games",
      markets: "",
      data_url: "/data/hooda_math.json"
    },
    {
      name: "educreations",
      logo_url: "/tools/educreations.png",
      description: "Teacher-recorded whiteboard sessions",
      markets: "",
      data_url: "/data/educreations.json"
    },
    {
      name: "PlaceKitten",
      logo_url: "/tools/place_kitten.png",
      description: "Browse kitten images",
      markets: "",
      data_url: "/data/placekitten.json"
    },
  ];
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
      var desc_idx = (tool.description || "").search(re);
      var rank = query == "" ? 0 : -1;
      if(name_idx > -1) { rank = name_idx; }
      else if(desc_idx > -1) { rank = desc_idx + 500; }
      tool.rank = rank;
      tool.position = idx;
      if(tool.rank > -1) { 
        matches.push(tool);
      }
    }
    if(matches.length == 0) {
      $tools.hide();
      $message.show().text("No Results Found");
    }
    matches = matches.sort(function(a, b) {
      return [a.rank - b.rank, a.position - b.position];
    });
    $tools.empty();
    for(var idx = 0; idx < matches.length; idx++) {
      var tool = matches[idx];
      var $tool = $("<div/>", {'class': 'tool'}).append(
        $("<img/>", {src: tool.logo_url, 'class': 'logo'})).append(
        $("<span/>", {'class': 'name'}).text(tool.name)).append(
        $("<span/>", {'class': 'description'}).text(tool.description));
      $tool.data('tool', tool);
      $tool.click(function() {
        var tool = $(this).data('tool');
        if(tool.launch_url) {
          location.href = tool.launch_url + "?selection_directive=embed_content&launch_presentation_return_url=" + encodeURIComponent(lti.returnUrl);
        } else {
          $tools.hide();
          $back.show();
          $logo.attr('src', tool.logo_url);
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
      });
      $tools.append($tool);
    }
  }
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
    if($(event.target).hasClass('preview') || ($(this).hasClass('single_resource') && !$(event.target).hasClass('name'))) { return; }
    var resource = $(this).data('resource');
    if(resource.links && !$(this).hasClass('single_resource')) {
      var $resource = $(this).detach().addClass('single_resource');
      $resource.find(".name").html("<a href='" + resource.url + "' class='name_link'>" + resource.name + "</a>");
      for(var idx = 0; idx < resource.links.length; idx++) {
        var links = resource.links[idx];
        var $content = "<div class='link_set'><div class='header'>" + links.name + "</div>";
        for(var jdx = 0; jdx < links.links.length; jdx++) {
          var link = links.links[jdx];
          $content = $content + "<div class='link' data-index='" + idx + "," + jdx + "'>";
          if(link.image_url) {
            $content = $content + "<img src='" + link.image_url + "' alt=''/>";
          }
          $content = $content + "<a href='" + link.url + "'>" + link.name + "</a></div>";
        }
        $content = $content + "</div>";
        $resource.append($content);
      }
      $resources.empty().append($resource);
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
        resource.description = "<b>" + linkCount + " link" + (linkCount == 1 ? "" : "s") + "</b><br/>" + resource.description;
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
      $tools.show();
      $back.hide();
      $logo.attr('src', $logo.attr('rel'));
      $launch.hide();
      $collection_name.text("Collections");
      $resources.hide();
      searchMode = "tools";
    });
    $form.submit(function(event) {
      event.preventDefault();
      event.stopPropagation();
      search();
    });
    $query.bind('keyup', search);
  });
})();