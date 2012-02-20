(function() {
  var url = location.href;
  var args = (url.split(/\?/)[1] || "").split(/\&/);
  var params = {};
  for(var idx in args) {
    var arg = args[idx].split(/\=/);
    var key = arg[0];
    var value = arg[1];
    if(key && value) {
      params[key] = decodeURIComponent(value);
    }
  }
  if(params['selection_directive'] != "embed_content" || !params['launch_presentation_return_url']) {
    alert("This page is normally used an an example of embedding content, but you've referenced it some other way. As such, it's not going to be very useful to you. Sorry.");
    callbackUrl = null;
  } else if(!params['launch_presentation_return_url'].match(/\?/)) {
    params['launch_presentation_return_url'] = params['launch_presentation_return_url'] + "?";
  }
  var returnUrl = params['launch_presentation_return_url'];

  var searchMode = "tools";
  var tools = [
    {
      name: "Khan Academy",
      logo_url: "/tools/khan.png",
      description: "",
      markets: "",
      launch_url: "https://lti-examples.heroku.com/khan.html"
    },
    {
      name: "Graph Builder",
      logo_url: "/tools/graph_tk.png",
      description: "",
      markets: "",
      launch_url: "https://lti-examples.heroku.com/graph.html"
    },
    {
      name: "Quizlet Flash Cards",
      logo_url: "/tools/quizlet.png",
      description: "",
      markets: "",
      launch_url: "https://lti-examples.heroku.com/quizlet.html"
    },
    {
      name: "PlaceKitten",
      logo_url: "/tools/place_kitten.png",
      description: "",
      markets: "",
      resources: [
        {
          name: "100x100 kitten",
          image_url: "http://placekitten.com/100/100",
          html: "<img src='http://placekitten.com/100/100'/>",
          description: "I call this kitten, \"Mittens\". I don't know if the cat is male or female."
        },
        {
          name: "200x200 kitten",
          image_url: "http://placekitten.com/200/200",
          html: "<img src='http://placekitten.com/200/200'/>",
          description: "...actually, I don't know if *any* of these cats are male or female..."
        },
        {
          name: "200x100 kitten",
          image_url: "http://placekitten.com/200/100",
          html: "<img src='http://placekitten.com/200/100'/>",
          description: "This is cheating, because it is more than one cat. What's that about?"
        },
        {
          name: "100x200 kitten",
          image_url: "http://placekitten.com/100/200",
          html: "<img src='http://placekitten.com/100/200'/>",
          description: "This is also cheating. It looks suspiciously similar to 100x100..."
        },
        {
          name: "300x300 kitten",
          image_url: "http://placekitten.com/300/300",
          html: "<img src='http://placekitten.com/300/300'/>",
          description: "I have a lot to say about this kitten, even though I don't really have much to say. I just want to give an example of a blurb for a kitten that is larger than the alotted space, so you can see what happens when there are tons and tons of words. On a semi-related note, I tend to type \"tongs\" instead of \"tons\". It's not on purpose, and it's not even muscle memory because, really, how often do you type the word \"tongs\"?"
        },
        {
          name: "200x300 kitten",
          image_url: "http://placekitten.com/200/300",
          html: "<img src='http://placekitten.com/200/300'/>",
          description: "This little guy seems a bit apathetic."
        },
        {
          name: "300x200 kitten",
          image_url: "http://placekitten.com/300/200",
          html: "<img src='http://placekitten.com/300/200'/>",
          description: "Standard kitten fare."
        },
        {
          name: "300x100 kitten",
          image_url: "http://placekitten.com/300/100",
          html: "<img src='http://placekitten.com/300/100'/>",
          description: "I actually prefer puppies to kittens."
        },
        {
          name: "100x300 kitten",
          image_url: "http://placekitten.com/100/300",
          html: "<img src='http://placekitten.com/100/300'/>",
          description: "How come there's no placepuppy.com?"
        },
      ]
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
      if(tool.rank > -1) { 
        matches.push(tool);
      }
    }
    if(matches.length == 0) {
      $tools.hide();
      $message.show().text("No Results Found");
    }
    matches = matches.sort(function(a, b) {
      return a.rank - b.rank;
    });
    $tools.empty();
    for(var idx = 0; idx < matches.length; idx++) {
      var tool = matches[idx];
      var $tool = $("<div/>", {'class': 'tool'}).append(
        $("<img/>", {src: tool.logo_url, 'class': 'logo'})).append(
        $("<span/>", {'class': 'name'}).text(tool.name));
      $tool.data('tool', tool);
      $tool.click(function() {
        var tool = $(this).data('tool');
        if(tool.launch_url) {
          location.href = tool.launch_url + "?selection_directive=embed_content&launch_presentation_return_url=" + encodeURIComponent(returnUrl);
        } else {
          $tools.hide();
          $back.show();
          $logo.attr('src', tool.logo_url);
          searchMode = "resources";
          $resources.show();
          $resources.data('tool', tool);
          $query.val("");
          search();
        }
      });
      $tools.append($tool);
    }
  }
  function searchResources() {
    $message.hide();
    $resources.show();
    $launch.hide();
    $tools.hide();
    var query = $query.val();
    var tool = $resources.data('tool');
    $collection_name.text(tool.name);
    var matches = [];
    for(var idx = 0; idx < tool.resources.length; idx++) {
      var resource = $.extend({}, tool.resources[idx]);
      var re = new RegExp(query, "i");
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
    for(var idx = 0; idx < matches.length && idx < 10; idx++) {
      var resource = matches[idx];
      var $resource = $("<div/>", {'class': 'resource'}).append(
        $("<div/>", {'class': 'name'}).text(resource.name))
      var $content = $("<div/>", {'class': 'content'});
      if(resource.image_url) {
        $content.append(
          $("<div/>", {'class': 'img_holder'}).append(
            $("<img/>", {src: resource.image_url, 'class': 'img'})
          )
        );
      }
      $content.append(
        $("<span/>", {'class': 'description'}).text(resource.description || "")
      );
      $resource.append($content);
      $resource.data('resource', resource);
      $resource.click(function() {
        var resource = $(this).data('resource');
        if(returnUrl) {
          if(resource.url) {
            location.href = returnUrl + "&embed_type=link&url=" + encodeURIComponent(resource.url) + "&text=" + encodeURIComponent(resource.name);
          } else if(resource.html) {
            var oembedUrl = location.protocol + "//" + location.host + "/oembed";
            var url = oembedUrl + "?code=" + encodeURIComponent(resource.html);
            location.href = returnUrl + "&embed_type=oembed&endpoint=" + encodeURIComponent(oembedUrl) + "&url=" + encodeURIComponent(url);
          }
        } else {
          alert('click');
        }
      });
      $resources.append($resource);
    }
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