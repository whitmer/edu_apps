var results = (function() {
  var $results = $("#results");
  var $message = $("#message");
  var $result = $("#result").detach().removeAttr('id');
  var clickHandlers = {};
  $results.on('click', '.result', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).data('clicked')();
  });
  return {
    'loading': function() {
      $results.empty().hide();
      $message.show().text("Loading...");
    },
    'ready': function(data, onSelect) {
      if(data.length == 0) {
        $results.empty().hide();
        $message.show().text("No Results Found");
        return;
      }
      $.each(data, function(idx, obj) {
        var entry = data[idx];
        var $entry = $result.clone(true);
        $entry.find(".title").text(entry.title);
        $entry.find(".img").attr('src', entry.image);
        $entry.find(".date").text(entry.date);
        $entry.find(".description").html(entry.description);
        $entry.data('clicked', function() {
          onSelect(entry);
        });
        $results.append($entry.show());
      });
      $results.show();
      $message.hide();
    },
    'error': function(message) {
        $results.empty().hide();
        $message.show().text(message);
    }
  };
})();
