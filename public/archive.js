
var lti;
(function() {
  var mediaTypes = {
    text: "/icons/text.png",
    texts: "/icons/text.png",
    audio: "/icons/audio.png",
    sound: "/icons/audio.png",
    image: "/icons/image.png",
    video: "/icons/video.png",
    movingimage: "/icons/video.png",
    movies: "/icons/video.png",
    other: "/icons/other.png",
    collection: "/icons/collection.png",
    education: "/icons/collection.png",
    items: "/icons/collection.png",
    etree: "/icons/collection.png",
    data: "/icons/data.png",
    software: "/icons/software.png",
    web: "/icons/web.png"
  };
  var $results = $("#results");
  var $message = $("#message");
  var $result = $("#result").detach().removeAttr('id');
  $result.click(function(event) {
    if($(event.target).hasClass('preview')) { return; }
    var videoUrl = $(this).attr('rel');
    var entry = $(this).data('entry');
    lti.resourceSelected({
      embed_type: 'link',
      url: videoUrl,
      text: entry.title
    });
  });
  $("#search").submit(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $results.empty().hide();
    $message.show().text("Loading...");
    var query = encodeURIComponent($("#query").val());
    var url = "http://archive.org/advancedsearch.php?q=" + query + "&fl%5B%5D=collection&fl%5B%5D=description&fl%5B%5D=format&fl%5B%5D=headerImage&fl%5B%5D=identifier&fl%5B%5D=licenseurl&fl%5B%5D=mediatype&fl%5B%5D=source&fl%5B%5D=subject&fl%5B%5D=title&rows=50&page=1&output=json&callback=callback&save=yes#raw";
    $.ajax({
      url: url,
      success: function(data) {
        if(!data.response || !data.response.docs || data.response.docs.length == 0) {
          $results.empty().hide();
          $message.show().text("No Results Found");
          return;
        }
        for(var idx = 0; idx < 48 && idx < data.response.docs.length && data.response.docs[idx]; idx++) {
          var entry = data.response.docs[idx];
          var $entry = $result.clone(true);
          $entry.data('entry', entry);
          var url = "http://archive.org/details/" + entry.identifier;
          $entry.find(".title").text(entry.title);
          $entry.find(".description").html(entry.description);
          $entry.find(".img").attr('src', mediaTypes[entry.mediatype.toLowerCase()] || mediaTypes['other']).attr('title', entry.mediatype).attr('alt', entry.mediatype);
          $entry.find(".preview").attr('href', url);
          $entry.attr('rel', url);
          $results.append($entry.show());
        }
        $(".result .img").tooltip();
        $results.show();
        $message.hide();
      },
      dataType: 'jsonp'
    });
  });
})();

