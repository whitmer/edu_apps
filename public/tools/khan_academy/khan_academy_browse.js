  var lti;
var results;
var breadcrumb;
(function() {
  $(document).live('on', 'click', '.topic,.exercise,.video', function(event) {
    event.preventDefault();
  });
  function loadTopic(id) {
    results.loading();
    $.ajax({
      url: "https://www.khanacademy.org/api/v1/topic/" + id,
      success: function(data) {
        var records = [];
        for(var idx = 0; idx < data.children.length; idx++) {
          var record = data.children[idx];
          if(record.hide) { continue; }
          record.durationString = durationString(parseInt(record.duration || "0", 10));
          records.push({
            kind: record.kind,
            id: record.id,
            url: record.url,
            image: record.kind + ".png",
            title: record.title,
            link_title: record.title
          });
        }
        results.ready(records, function(record, event) {
          if(record.kind == 'Topic') {
            loadTopic(record.id);
            breadcrumb.add(record.title, record.id);
          } else {
            selectResource(record);
          }
        });
      },
      dataType: 'jsonp'
    });
  }
  function selectResource(record) {
    if(record.kind == 'Video') {
      $.ajax({
        url: "https://www.khanacademy.org/api/v1/videos/" + record.id,
        success: function(data) {
          lti.resourceSelected({
            embed_type: 'link',
            url: "https://www.khanacademy.org/embed_video?v=" + data.youtube_id,
            text: record.title
          });
        },
        dataType: 'jsonp'
      });
    } else {
      lti.resourceSelected({
        embed_type: 'link',
        url: record.url,
        text: record.title
      });
    }
  }
  function durationString(duration) {
    var seconds = duration % 60;
    var minutes = (duration - seconds) / 60;
    duration = (minutes || "0") + ":" + (seconds < 10 ? ("0" + seconds) : seconds);
    return duration;
  }
  loadTopic('root');
  breadcrumb.add("All", "root");
  breadcrumb.select = function(id) {
    loadTopic(id);
  };
})();
