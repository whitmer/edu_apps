var lti;
var results;
(function() {
  $("#search").submit(function(event) {
    event.preventDefault();
    event.stopPropagation();
    results.loading();
    var query = encodeURIComponent($("#query").val());
    var userPathPart = window.youtubeAccount ? ("/users/" + window.youtubeAccount + "/uploads") : '/videos';
    var url = "https://gdata.youtube.com/feeds/api" + userPathPart + "?v=2&q=" + query + "&orderby=relevance&alt=json-in-script";
    $.ajax({
      url: url,
      success: function(data) {
        var videos = [];
        for(var idx = 0; idx < 16 && idx < data.feed.entry.length && data.feed.entry[idx]; idx++) {
          var entry = data.feed.entry[idx];
          var duration = durationString(parseInt(entry['media$group']['yt$duration']['seconds'], 10));
          videos.push({
            title: "(" + duration + ") " + entry.title['$t'],
            image: entry['media$group']['media$thumbnail'][0].url,
            url: entry.link[0].href,
            id: entry.link[0].href.match(/v=([-_\w]+)/)[1],
            link_title: entry.title['$t']
          });
        }
        results.ready(videos, function(video) {
          selectVideo(video.id, video.link_title);
        });
      },
      dataType: 'jsonp'
    });
  });
})();
function durationString(duration) {
  var seconds = duration % 60;
  var minutes = (duration - seconds) / 60;
  duration = (minutes || "0") + ":" + (seconds < 10 ? ("0" + seconds) : seconds);
  return duration;
}
function selectVideo(id, title) {
  // http://www.youtube.com/watch?v=embgWgjwybc&feature=youtube_gdata
  // http://www.youtube.com/embed/embgWgjwybc
  if(lti.params && (lti.params.selection_directive == 'select_link' || !lti.params.selection_directive)) {
    lti.resourceSelected({
      embed_type: 'link',
      url: "http://www.youtube.com/embed/" + id,
      text: title
    });
  } else {
    lti.resourceSelected({
      embed_type: 'link',
      url: "http://www.youtube.com/watch?v=" + id,
      text: title
    });
  }
}