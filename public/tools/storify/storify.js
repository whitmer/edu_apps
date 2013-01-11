(function() {
  $.digits = function(number){ 
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); 
  }

  var $results = $("#results");
  var $message = $("#message");
  var $link = $("#link");
  var $embed = $("#embed");
  var $result = $("#result").detach().removeAttr('id');
  $result.click(function(event) {
    if($(event.target).hasClass('preview')) { return; }
    var story = $(this).data('story');
    lti.resourceSelected({
      embed_type: 'link',
      url: story.permalink,
      title: story.title
    });
  });
  $("#type").change(function() {
    $("#search").submit();
  });
  $("#search").submit(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $results.empty().hide();
    $message.show().text("Loading...");
    var query = encodeURIComponent($("#query").val());
    var sort = $("#type").val() == 'latest' ? 'latest' : 'popular';
    $.ajax({
      url: '/storify_search?q=' + query + "&sort=" + sort,
      success: function(data) {
        if(data.error || data.length === 0) {
          $results.empty().hide();
          $message.show().text("No Results Found");
          return;
        }
        for(var idx = 0; idx < 30 && idx < data.length && data[idx]; idx++) {
          var story = data[idx];
          var $entry = $result.clone(true);
          $entry.find(".title").text(story.title);
          $entry.find(".thumb").attr('src', story.thumbnail).toggleClass('default', story.thumbnail.match(/default-thumb/));
          $entry.find(".description").html(story.description);
          $entry.find(".author").text(story.author.username);
          $entry.find(".views").text($.digits(story.stats.views));
          $entry.find(".preview").attr('href', story.permalink);
          $results.append($entry.show());
          $entry.data('story', story);
        }
        $results.show();
        $message.hide();
      },
      dataType: 'json'      
    });
  }).submit();
})();