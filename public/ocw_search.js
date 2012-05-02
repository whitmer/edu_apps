var lti;
(function() {
  var $results = $("#results");
  var $message = $("#message");
  var $result = $("#result").detach().removeAttr('id');
  $result.click(function() {
    var entry = $(this).data('entry');
    lti.resourceSelected({
      embed_type: 'link',
      url: entry.url,
      text: entry.title
    });
  });
  $("#search").submit(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $results.empty().hide();
    $message.show().text("Loading...");
    var query = encodeURIComponent($("#query").val());
    var url = "/" + search_endpoint + "?q=" + query;
    $.ajax({
      url: url,
      success: function(data) {
        if(data.length == 0) {
          $results.empty().hide();
          $message.show().text("No Results Found");
          return;
        }
        for(var idx = 0; idx < 18 && idx < data.length && data[idx]; idx++) {
          var entry = data[idx];
          var $entry = $result.clone(true);
          $entry.data('entry', entry);
          $entry.find(".title").text(entry.title);
          $entry.find(".desc").html(entry.description);
          $entry.find(".preview").attr('href', entry.url);
          $results.append($entry.show());
        }
        $results.show();
        $message.hide();
      },
      error: function() {
        $results.empty().hide();
        $message.show().text("There was a problem retrieving results");
      },
      dataType: 'json'
    });
  });
})();