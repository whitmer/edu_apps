(function() {
  var url = location.href;
  var args = (url.split(/\?/)[1] || "").split(/\&/);
  var params = {}
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

  var $results = $("#results");
  var $message = $("#message");
  var $slideshare = $("#slideshare");
  var $slideshare_wrapper = $("#slideshare_wrapper");
  var $link = $("#link");
  var $embed = $("#embed");
  function updatePreview($entry) {
    var slideshare = $entry.data('slideshare');
    $slideshare_wrapper.html(slideshare.embed_code);
    $slideshare.data('slideshare', slideshare);    
    $results.hide();
    $message.hide();
    $slideshare.show();
  }
  var $result = $("#result").detach().removeAttr('id');
  $result.click(function() {
    updatePreview($(this));
  });
  $link.click(function() {
    var slideshare = $slideshare.data('slideshare');
    if(returnUrl) {
      location.href = returnUrl + "&embed_type=link&url=" + encodeURIComponent(slideshare.url) + "&title=" + encodeURIComponent(slideshare.title);
    } else {
      alert('link click');
    }
  });
  $embed.click(function() {
    var slideshare = $slideshare.data('slideshare');
    if(returnUrl) {
      location.href = returnUrl + "&embed_type=oembed&url=" + encodeURIComponent(slideshare.url) + "&endpoint=" + encodeURIComponent("http://www.slideshare.net/api/oembed/2");
    } else {
      alert('embed click');
    }
  });
  $("#search").submit(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $results.empty().hide();
    $slideshare.hide();
    $slideshare_wrapper.html("");
    $message.show().text("Loading...");
    var query = encodeURIComponent($("#query").val());
    $.ajax({
      url: '/slideshare_search?q=' + query,
      success: function(data) {
        if(data.error || data.length === 0) {
          $results.empty().hide();
          $message.show().text("No Results Found");
          return;
        }
        for(var idx = 0; idx < 30 && idx < data.length && data[idx]; idx++) {
          var slideshare = data[idx];
          var $entry = $result.clone(true);
          $entry.find(".title").text(slideshare.title);
          $entry.find(".thumbnail").attr('src', slideshare.image_url);
          $entry.find(".description").html(slideshare.description);
          $entry.find(".author").text(slideshare.author);
          $entry.attr('data-id', slideshare.id);
          $results.append($entry.show());
          $entry.data('slideshare', slideshare);
        }
        $results.show();
        $message.hide();
      },
      dataType: 'json'
    });
  });
})();