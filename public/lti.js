var lti = lti || {};
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
  if(params['selection_directive'] != "embed_content" || !params['launch_presentation_return_url']) {
    alert("This page is normally used an an example of embedding content, but you've referenced it some other way. As such, it's not going to be very useful to you. Sorry.");
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
      alert('resource selected');
      console.log(data);
    }
  };
})();