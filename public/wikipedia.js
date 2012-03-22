var lti;
(function() {
  var $results = $("#results");
  var $message = $("#message");
  var $result = $("#result").detach().removeAttr('id');
  $result.click(function(event) {
    if($(event.target).hasClass('preview')) { return; }
    event.preventDefault();
    var videoUrl = $(this).attr('rel');
    var entry = $(this).data('article');
    var obj = {
      embed_type: 'link',
      url: entry.url,
      text: entry.title
    }
    if($(event.target).hasClass('embed')) {
      obj.embed_type = 'iframe';
      obj.width = '500';
      obj.height = '350';
    }
    lti.resourceSelected(obj);
  });
  $("#search").submit(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $results.empty().hide();
    $message.show().text("Loading...");
    var query = encodeURIComponent($("#query").val());
    var url = "/wikipedia_search?q=" + query;    
    $.ajax({
      url: url,
      success: function(data) {
        if(data.error || data.length === 0) {
          $results.empty().hide();
          $message.show().text("No Results Found");
          return;
        }
        for(var idx = 0; idx < data.length && data[idx]; idx++) {
          var article = data[idx];
          var $entry = $result.clone(true);
          $entry.find(".title").text(article.title);
          $entry.find(".description").html(article.description);
          $entry.find(".preview").attr('href', article.url);
          $results.append($entry.show());
          $entry.data('article', article);
        }
        $results.show();
        $message.hide();
      },
      dataType: 'json'
    });
  });
})();