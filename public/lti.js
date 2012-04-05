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
  function showPickedResource(data) {
    var $widget = null;
    if(data.embed_type == 'iframe') {
      $widget = $("<iframe/>", {
        src: data.url,
        frameborder: 0,
        title: data.text,
        style: "width: " + data.width + "px; height: " + data.height + "px;"
      });
    } else if(data.embed_type == 'image') {
      $widget = $("<img/>", {
        src: data.url,
        alt: data.text,
        title: data.text,
        style: "width: " + data.width + "px; height: " + data.height + "px;"
      });
    } else if(data.embed_type == 'link') {
      $widget = $("<a/>", {
        href: data.url,
        title: data.title,
        target: (data.target == '_blank' ? '_blank' : '')
      }).text(data.text);
    }
    if($widget) {
      var $textarea = $("<textarea/>", {'style': 'width: 400px; height: 200px;'});
      $textarea.val($("<div/>").append($widget).html());
      var $stuff = $("<div style='width: 400px; margin: 20px auto;' class='insertion'><h1>Resource Selected!</h1><p>You're not in a system that supports auto-inserting content, so you'll need to copy and past the following code by hand in order to insert it into your content.</p></div>").append($textarea);
      $("body").empty().append($stuff);
    } else {
      var $stuff = $("<div style='width: 400px; margin: 20px auto;' class='insertion'><h1>Resource Selected!</h1><p>You're not in a system that supports auto-inserting content, and the resource you've selected can't just be copied and pasted into the system. Please request support for \"" + data.embed_type + "\" embedding by contacting your administrator.</p></div>").append($textarea);
      $("body").empty().append($stuff);
    }
  }
  (function() {
    var params = lti.params;
    if(params['selection_directive'] != "embed_content" || !params['launch_presentation_return_url']) {
      console.log("This page is normally used an an example of embedding content, but you've referenced it some other way. As such, it's not going to be very useful to you, other than maybe for demo purposes.");
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
        showPickedResource(data);
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