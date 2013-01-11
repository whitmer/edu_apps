var lti;
(function() {
  $("#embed").click(function() {
    var query = $("#query").val();
    lti.resourceSelected({
      embed_type: 'link',
      url: "http://www.wolframalpha.com/input/?i=" + encodeURIComponent(query),
      text: "Wolfram Alpha search",
      target: "_blank"
    });
  });
})();
