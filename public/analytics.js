var _gaq = _gaq || [];
$.getJSON('/analytics_key.json', function(data) {
  if(data && data.key) {
    _gaq.unshift(['_trackPageview']);
    _gaq.unshift(['_setAccount', data.key]);
  
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  }
});
function trackEvent(a, b, c, d, e) {
  _gaq.push(['_trackEvent', a, b, c, d, e]);
}
