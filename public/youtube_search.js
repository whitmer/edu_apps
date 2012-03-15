var lti;
(function() {
  var $results = $("#results");
  var $message = $("#message");
  var $result = $("#result").detach().removeAttr('id');
  $result.click(function() {
    var videoUrl = $(this).attr('rel');
    var entry = $(this).data('entry');
    lti.resourceSelected({
      embed_type: 'link',
      url: entry.link[0].href,
      text: entry.title['$t']
    });
  });
  $("#search").submit(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $results.empty().hide();
    $message.show().text("Loading...");
    var query = encodeURIComponent($("#query").val());
    var url = "http://gdata.youtube.com/feeds/api/users/" + window.youtubeAccount + "/uploads?v=2&q=" + query + "&orderby=relevance&alt=json-in-script";
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
  });
})();