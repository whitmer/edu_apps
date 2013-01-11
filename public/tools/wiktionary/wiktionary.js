var lti;
(function() {
  var $results = $("#results");
  var $message = $("#message");
  var $result = $("#result").detach().removeAttr('id');
  $result.click(function(event) {
    if($(event.target).hasClass('preview')) { return; }
    event.preventDefault();
    var def = $(this).data('def');
    var oembedUrl = "http://" + location.host + "/oembed";
    var html = def;
    var url = oembedUrl + "?code=" + encodeURIComponent(html);
    lti.resourceSelected({
      embed_type: 'oembed',
      endpoint: oembedUrl,
      url: url
    });
  });
  $("#search").submit(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $results.empty().hide();
    $message.show().text("Loading...");
    var query = encodeURIComponent($("#query").val());
    var url = "/wiktionary_search?q=" + query;    
    $.ajax({
      url: url,
      success: function(data) {
        if(data.error || data.length === 0) {
          $results.empty().hide();
          $message.show().text("No Results Found");
          return;
        }
        var url = "http://en.wiktionary.org/wiki/" + encodeURIComponent(query);
        $results.append("<div class='header'>Definitions for <a target='_blank' href='" + url + "'>" + query + "</a></div>");

        for(var idx = 0; idx < data.length; idx++) {
          var list = data[idx].definitions;
          var type = data[idx].type;
          for(var jdx = 0; jdx < list.length; jdx++) {
            var def = list[jdx];
            var $entry = $result.clone(true);
            $entry.find(".type").text(type.toLowerCase());
            $entry.find(".def").html(def);
            $entry.data('def', "<a href='" + url + "'>" + query + "</a> - " + type.toLowerCase() + ". " + def);
            $results.append($entry.show());
          }
        }
        $results.show();
        $message.hide();
      },
      dataType: 'json'
    });
  });
})();