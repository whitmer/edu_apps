var lti;
(function() {
  $.digits = function(number){ 
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); 
  }
  var $results = $("#results");
  var $message = $("#message");
  var $result = $("#result").detach().removeAttr('id');
  $(".result").live('click', function(event) {
    if($(event.target).hasClass('preview')) { return; }
    event.preventDefault();
    var videoUrl = $(this).attr('rel');
    var entry = $(this).data('entry');
    if($(event.target).hasClass('embed')) {
      lti.resourceSelected({
        embed_type: 'iframe',
        url: "http://www.schooltube.com/embed/" + entry.vkey,
        width: 500,
        height: 375,
        title: entry.title
      });
    } else {
      lti.resourceSelected({
        embed_type: 'link',
        url: entry.short_url,
        text: entry.title
      });
    }
  });
  $("#search").submit(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $results.empty().hide();
    $message.show().text("Loading...");
    var query = encodeURIComponent($("#query").val());
    var search = query ? "/search" : "";
    var url = "http://www.schooltube.com/api/v1/video" + search + "?term=" + encodeURIComponent(query) + "&order_by=-view_count&limit=48";
    $.ajax({
      url: url,
      success: function(data) {
        console.log(data);
        if(!data.objects || data.objects.length == 0) {
          $results.empty().hide();
          $message.show().text("No Results Found");
          return;
        }
        for(var idx = 0; idx < data.objects.length && data.objects[idx]; idx++) {
          var entry = data.objects[idx];
          var $entry = $result.clone(true);
          $entry.data('entry', entry);
          var duration = entry.duration;
          var seconds = duration % 60;
          var minutes = (duration - seconds) / 60;
          duration = (minutes || "0") + ":" + (seconds < 10 ? ("0" + seconds) : seconds);
          $entry.find(".title").text("(" + duration + ") " + entry.title);
          $entry.find(".img").attr('src', entry.thumbnail_url);
          $entry.find(".views").text($.digits(entry.view_count) + " view" + (entry.view_count == 1 ? "" : "s"));
          $entry.find(".description").text(entry.description);
          $entry.find(".embed_holder").toggle(entry.allow_embed);
          $entry.find(".preview").attr('href', entry.short_url);
          $entry.attr('rel', entry.short_url);
          $results.append($entry.show());
        }
        $results.show();
        $message.hide();
      },
      dataType: 'jsonp'
    });
  }).submit();
})();