var lti = lti || {};
var skipValidation; 
(function() {
  var url = location.href;
  var args = (url.split(/\?/)[1] || "").split(/\&/);
  var params = {}
  for(var idx in args) {
    var arg = args[idx].split(/\=/);
    var key = arg[0];
    var value = arg[1];
    if(key && value) {
      params[key] = decodeURIComponent(value);
    }
  }
  lti.params = params;
})();
if(!skipValidation) {
  (function() {
    var params = lti.params;
    if(params['selection_directive'] != "embed_content" || !params['launch_presentation_return_url']) {
      alert("This page is normally used an an example of embedding content, but you've referenced it some other way. As such, it's not going to be very useful to you, other than maybe for demo purposes.");
      callbackUrl = null;
    } else if(!params['launch_presentation_return_url'].match(/\?/)) {
      params['launch_presentation_return_url'] = params['launch_presentation_return_url'] + "?";
    }
    var returnUrl = params['launch_presentation_return_url'];
    lti.resourceSelected = function(data) {
      if(returnUrl) {
        var url = returnUrl;
        for(var idx in data) {
          url = url + (url.match(/\?/) ? "&" : "?") + idx + "=" + encodeURIComponent(data[idx]);
        }
        location.href = url;
      } else {
        alert('You selected a resource. If this were in an LMS the resource would have been added just then.');
        console.log(data);
      }
    };
  })();
}
if($("#header_img").length && lti.params && lti.params['custom_lti_back_button']) {
  var $btn = $("<button id='back' style='float: left; width: 30px; font-size: 10px; height: 72px; margin-right: 3px;' class='btn btn-inverse' type='button'><span class='icon-white icon-chevron-left'></span> Back</button>");
  $("#header_img").before($btn);  
  $btn.click(function() {
    history.back();
  });
}