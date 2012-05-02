(function() {
  var $results = $("#results");
  var $message = $("#message");
  var $result = $("#result").detach().removeAttr('id');
  $result.click(function() {
    var videoUrl = $(this).attr('rel');
    lti.resourceSelected({
      embed_type: 'link',
      url: videoUrl,
      text: $(this).find(".title").text()
    });
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