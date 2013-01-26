var lti;
var breadcrumb;
(function() {
  var $breadcrumb = $("#breadcrumb");
  breadcrumb = {
    list: [],
    add: function(text, id) {
      breadcrumb.list.push([text, id]);
      updateBreadcrumb();
    },
    select: function() {
      alert("not implemented");
    }
  };
  $("#breadcrumb").on('click', 'a', function(event) {
    event.preventDefault();
    var id = $(this).parent().attr('data-id');
    var newList = [];
    var found = false;
    for(var idx = 0; idx < breadcrumb.list.length && !found; idx++) {
      if(id == breadcrumb.list[idx][1]) {
        found = true;
      }
      newList.push(breadcrumb.list[idx]);
    }
    breadcrumb.list = newList;
    breadcrumb.select(id);
    updateBreadcrumb();
  });
  function updateBreadcrumb() {
    $breadcrumb.empty();
    for(var idx in breadcrumb.list) {
      var item = breadcrumb.list[idx];
      if(idx == breadcrumb.list.length - 1) {
        $breadcrumb.append("<li data-id='" + item[1] + "'>" + item[0] + "</li>");
      } else {
        $breadcrumb.append("<li data-id='" + item[1] + "'><a href='#'>" + item[0] + "</a></li>");
        $breadcrumb.append("<li><span class='divider'> / </span></li>");
      }
    }
  }
})();