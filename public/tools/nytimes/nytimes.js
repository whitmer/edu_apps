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
    results.loading();
    var query = encodeURIComponent($("#query").val());
    var url = "/nytimes_search?rank=" + $("#rank").val() + "&year=" + $("#year").val() + "&q=" + query;
    $.ajax({
      url: url,
      success: function(data) {
        var articles = [];
        for(var idx = 0; idx < data.length; idx++) {
          var article = data[idx];
          var date = "no date";
          if(article.date) {
            date = article.date.substring(4, 6) + "/" + article.date.substring(6, 8) + "/" + article.date.substring(0, 4);
          }
          articles.push({
            title: article.title,
            description: article.body,
            date: date,
            url: article.url
          });
        }
        results.ready(articles, function(article) {
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