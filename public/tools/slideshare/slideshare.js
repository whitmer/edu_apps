(function() {
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
    lti.resourceSelected({
      embed_type: 'link',
      url: slideshare.url,
      title: slideshare.title
    });
  });
  $embed.click(function() {
    var slideshare = $slideshare.data('slideshare');
    lti.resourceSelected({
      embed_type: 'oembed',
      url: slideshare.url,
      endpoint: "http://www.slideshare.net/api/oembed/2"
    });
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
          $entry.find(".thumb").attr('src', slideshare.image_url);
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