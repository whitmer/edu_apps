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
      location.href = returnUrl + "&embed_type=link&url=" + encodeURIComponent(entry.link) + "&text=" + encodeURIComponent(entry.title);
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
    var url = "http://api.usatoday.com/open/articles?search=" + query + "&count=15&encoding=json&api_key=6zb4ck73bzbqtczgcq7tsjaf";
    $.ajax({
      url: url,
      success: function(data) {
        console.log(data);
        if(!data.stories || data.stories.length == 0) {
          $results.empty().hide();
          $message.show().text("No Results Found");
          return;
        }
        for(var idx = 0; idx < data.stories.length && data.stories[idx]; idx++) {
          var entry = data.stories[idx];
          var $entry = $result.clone(true);
          var date = entry.pubDate.split(/\s/)
          $entry.data('entry', entry);
          $entry.find(".title").text(entry.title);
          $entry.find(".description").text(entry.description);
          $entry.find(".date").text(date.slice(0, 4).join(" "));
          $entry.attr('rel', entry.link);
          $results.append($entry.show());
        }
        $results.show();
        $message.hide();
      },
      dataType: 'jsonp',
      jsonp: 'jsoncallbackmethod',
      jsonpCallback: 'usatodayresults'
    });
  });
})();