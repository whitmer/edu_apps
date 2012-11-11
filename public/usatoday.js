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
    var url = "/usa_today_search?q=" + query;
    $.ajax({
      url: url,
      success: function(data) {
        if(!data.stories || data.stories.length == 0) {
          $results.empty().hide();
          $message.show().text("No Results Found");
          return;
        }
        for(var idx = 0; idx < data.stories.length && data.stories[idx]; idx++) {
          var entry = data.stories[idx];
          var $entry = $result.clone(true);
          if(entry.pubDate.length == 0) { entry.pubDate = ""; }
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
      dataType: 'json'
    });
  });
})();