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
  var $result = $("#result").detach().removeAttr('id');
  $result.click(function() {
    var videoUrl = $(this).attr('rel');
    if(returnUrl) {
      var entry = $(this).data('entry');
      location.href = returnUrl + "&embed_type=link&url=" + encodeURIComponent(entry.link[0].href) + "&text=" + encodeURIComponent(entry.title['$t']);
    } else {
      alert('click');
    }
  });
  $("#search").submit(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $results.empty().hide();
    $message.show().text("Loading...");
    var query = encodeURIComponent($("#query").val());
    var url = "http://gdata.youtube.com/feeds/api/users/TEDEducation/uploads?v=2&q=" + query + "&orderby=relevance&alt=json-in-script";
    $.ajax({
      url: url,
      success: function(data) {
        if(!data.feed || !data.feed.entry || data.feed.entry.length == 0) {
          $results.empty().hide();
          $message.show().text("No Results Found");
          return;
        }
        for(var idx = 0; idx < 16 && idx < data.feed.entry.length && data.feed.entry[idx]; idx++) {
          var entry = data.feed.entry[idx];
          var $entry = $result.clone(true);
          $entry.data('entry', entry);
          var duration = parseInt(entry['media$group']['yt$duration']['seconds'], 10);
          var seconds = duration % 60;
          var minutes = (duration - seconds) / 60;
          duration = (minutes || "0") + ":" + (seconds < 10 ? ("0" + seconds) : seconds);
          $entry.find(".title").text("(" + duration + ") " + entry.title['$t']);
          $entry.find(".img").attr('src', entry['media$group']['media$thumbnail'][0].url);
          $entry.attr('rel', entry.link[0].href);
          $results.append($entry.show());
        }
        $results.show();
        $message.hide();
      },
      dataType: 'jsonp'
    });
  }).submit();
})();