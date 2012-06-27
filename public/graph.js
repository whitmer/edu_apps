(function() {
  var insert_graph = document.getElementsByClassName('insert_graph')[0];
  var zoom_out = document.getElementsByClassName('zoom_out')[0];
  var zoom_ind = document.getElementsByClassName('zoom_in')[0];
  var lock_graph = document.getElementById('inline_graph_lock_graph');
  var show_console = document.getElementById('inline_graph_show_console');
  var allow_console = document.getElementById('inline_graph_allow_console');
  var show_formulas = document.getElementById('inline_graph_show_formulas');
  var help_link = document.getElementById('help_link');
  var help_box = document.getElementById('help_box');
  var zoom_in = document.getElementById('zoom_in');
  var zoom_out = document.getElementById('zoom_out');
  var iframe = document.getElementById('inline_graph_iframe');
  
  var win = function() {
    var res = null;
    if (iframe.contentWindow) {
      res = iframe.contentWindow;
    } else {
      res = window.frames['inline_graph_iframe'];
    }
    return res;
  }
  
  show_formulas.addEventListener('change', function() {
    win().app.ui.legend(show_formulas.checked);
  });
  allow_console.addEventListener('change', function() {
    win().app.ui.button('>_', allow_console.checked);
  });
  show_console.addEventListener('change', function() {
    if(show_console.checked) {
      win().app.ui.console.show();
    } else {
      win().app.ui.console.hide();
    }
  });
  help_link.addEventListener('click', function(event) {
    event.preventDefault();
    help_box.style.display = help_box.style.display == 'block' ? 'none' : 'block';
  });
  zoom_in.addEventListener('click', function() {
    win().app.ui.scale(2, 2, 1);
  });
  zoom_out.addEventListener('click', function() {
    win().app.ui.scale(0.5, 0.5, 1);
  });
  lock_graph.addEventListener('click', function() {
    win().app.ui.block(lock_graph.checked);
  });
  insert_graph.addEventListener('click', function() {
    var state = win().app.get_state();
    state.snapshot = 1;
    state.console = 0;
    state.reload = 1;
    var data_uri = win().app.ui.png(false);
  
    var link = location.protocol + "//" + location.host + "/graph.tk/index.html#json=" + encodeURIComponent(JSON.stringify(state));
    lti.resourceSelected({
      embed_type: 'iframe',
      width: '500',
      height: '400',
      url: link,
      text: "Embedded Graph"
    });
  });
  var options = {};
  var state = options.state || {console: 0, legend: 1};
  state.console = state.console || 0;
  state.snapshot = 0;
  state.reload = 1;
  show_formulas.checked = state.legend != 0;
  allow_console.checked = state.allow_console == 1;
  show_console.checked = state.console == 1;
  lock_graph.checked = state.block == 1;
  state.picture = 0;
  iframe.src = '/graph.tk/index.html#json=' + encodeURIComponent(JSON.stringify(state));
})();