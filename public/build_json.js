$(document).on('click', '#add', function() {
  var html = Handlebars.templates['data_entry']({});
  $("#data tbody tr:last").before(html);
  updateCounts();
});
$(document).on('change', '.image_url', function(event) {
  $(event.target).closest(".record").find("img").attr('src', $(this).val());
});
$(document).on('change', '.url', function(event) {
  $(event.target).closest(".record").find("a").attr('href', $(this).val());
});
$(document).on('click', '.delete', function(event) {
  $(event.target).closest(".record").remove();
});
$(document).on('click', '#build', function() {
  var results = [];
  $("#data .record").each(function() {
    results.push({
      image_url: $(this).find(".image_url").val(),
      url: $(this).find(".url").val(),
      name: $(this).find(".title").val(),
      description: $(this).find(".desc").val()
    });
  });
  $("#json").val(JSON.stringify(results, undefined, 2));
});
$(document).on('click', '#parse', function() {
  var results = JSON.parse($("#json").val());
  $("#data .record").remove();
  for(var idx in results) {
    var html = Handlebars.templates['data_entry'](results[idx]);
    $("#data tbody tr:last").before(html);
  }
  updateCounts();
});
function updateCounts() {
  var idx = 1;
  var total = $("#data .record").length;
  $("#data .record").each(function() {
    $(this).find(".cnt").text(idx).end()
      .find(".total").text(total);
    idx++;
  });
}