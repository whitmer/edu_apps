var lti;
(function() {
  var $results = $("#results");
  var $message = $("#message");
  var $result = $("#result").detach().removeAttr('id');
  $result.click(function() {
    var videoUrl = $(this).attr('rel');
    var entry = $(this).data('entry');
    console.log(entry);
    var id = entry.link[0].href.match(/v=(\w+)/)[1];
    selectVideo(id, entry.title['$t']);
  });
  $("#search").submit(function(event) {
    event.preventDefault();
    event.stopPropagation();
    results.loading();
    var objectType = $("#object_type").val();
    var query = encodeURIComponent($("#query").val());
    var token = "bd668fbe-2714-11e2-b725-123140ffee6b";
    var search = {
      'assessments': '/gooruapi/rest/assessment/search',
      'collections': '/gooru-search/rest/search/collection',
      'resources': '/gooru-search/rest/search/resource'
    }
    var player = {
      'assessments': 'http://www.goorulearning.org/gooru/index.g#!/quiz/_id_/take/practice',
      'collections': 'http://www.goorulearning.org/gooru/index.g#!/collection/_id_/play',
      'resources': 'http://www.goorulearning.org/gooru/index.g#!/r/_id_'
    }
    var url = "https://www.goorulearning.org" + search[objectType] + "?pageSize=40&sessionToken=" + token + "&query=" + query;
    $.ajax({
      url: url,
      success: function(data) {
        var entries = [];
        for(var idx in data.searchResults) {
          var entry = data.searchResults[idx];
          entries.push({
            title: entry.title,
            image: entry.thumbnails.url.replace(/\.(\w+)$/, "-160x120.$1"),
            id: entry.id,
            player_url: player[objectType].replace(/_id_/, entry.id)
          });
        }
        results.ready(entries, function(entry) {
          lti.resourceSelected({
            embed_type: 'link',
            url: entry.player_url,
            text: entry.title
          });
        });
      },
      dataType: 'jsonp'
    });
  });
})();
