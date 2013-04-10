$("#filter_settings").submit(function(event) {
  event.preventDefault();
  var array = $(event.target).serializeArray();
  console.log(array);
  $.ajax({
    url: $(event.target).attr('action'),
    type: "POST",
    data: array,
    dataType: 'json',
    success: function(data) { 
      location.reload();
    },
    error: function() {
      alert("Error!");
    }
  });
});
$(":checkbox").change(function() {
  $(this).closest(".app").toggleClass('selected', !!$(this).attr('checked'));
}).each(function() {
  $(this).change();
});