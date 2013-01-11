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
    if($(event.target).hasClass('preview') || $(event.target).hasClass('source')) { return; }
    var pin = $(this).data('pin');
    var oembedUrl = "http://" + location.host + "/oembed";
    var html = "<a href='" + pin.source + "' title='" + pin.description + "'><img src='" + pin.images.mobile + "'/></a>";
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
    $.ajax({
      url: '/pinterest_search?q=' + query,
      success: function(data) {
        if(data.error || data.length === 0) {
          $results.empty().hide();
          $message.show().text("No Results Found");
          return;
        }
        var heights = [0, 0, 0];
        
        var rows = [$("<div/>", {'class': 'result_column'})];
        rows.push(rows[0].clone());
        rows.push(rows[0].clone());
        
        for(var idx = 0; idx < 30 && idx < data.pins.length; idx++) {
          var pin = data.pins[idx];
          var $entry = $result.clone(true);
          $entry.find(".thumb").attr('src', pin.images.board);
          $entry.find(".description").html(pin.description);
          $entry.find(".author").text(pin.user.username);
          $entry.find(".views").text($.digits(pin.counts.repins));
          $entry.find(".preview").attr('href', pin.images.mobile);
          $entry.find(".source").attr('href', pin.source);
          var height = Math.min.apply(null, heights);
          for(var jdx = 0; jdx < rows.length; jdx++) {
            if(height == heights[jdx]) {
              heights[jdx] = heights[jdx] + pin.sizes.board.height;
              rows[jdx].append($entry.show());
              jdx = rows.length;
            }
          }
          $entry.data('pin', pin);
        }
        $results.append(rows[0]).append(rows[1]).append(rows[2]);
        $results.show();
        $message.hide();
      },
      dataType: 'json'      
    });
  }).submit();
})();