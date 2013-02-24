$(document).ready(function() {
  $("#search").submit(function(event) {
    event.preventDefault();
    $("#preview").attr('src', iframeUrl(true));
  });
  $("#add").click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    var url = 
    lti.resourceSelected({
      embed_type: 'iframe',
      url: iframeUrl(),
      width: 550,
      height: 200,
      title: "GitHub repository"
    });
  });
  function iframeUrl(rand) {
    var url = location.protocol + "//" + location.host + "/tools/github/github_summary.html";
    if(rand) {
      var key = Math.random();
      url = url + "?key=" + key;
      "github_summary.html?key=" + key + "#" + $("#query").val()
    }
    url = url + "#" + $("#query").val();
    return url;
  }
  $("#search").submit();
});