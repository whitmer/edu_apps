(function() {
  var host = "http://72.243.185.28";
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
    results.loading();
    var query = encodeURIComponent($("#query").val());
    var url = "/learning_registry_search?host=" + encodeURIComponent(host) + "&q=" + query;
    $.ajax({
      url: url,
      success: function(data) {
        var records = [];
        for(var idx = 0; idx < data.length; idx++) {
          var record = data[idx];
          var date = "no date";
          records.push({
            title: record.title,
            description: record.description,
            date: date,
            url: record.url,
            image: (record.hasScreenshot ? (host + "/screenshot/" + record._id) : "/prompt.png")
          });
        }
        results.ready(records, function(article) {
          lti.resourceSelected({
            embed_type: 'link',
            url: article.url,
            text: article.title
          });
        });
      },
      dataType: 'json'
    });
  });
})();
