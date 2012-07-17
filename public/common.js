$(function() {
  if(location.href.match(/logged_in/)) {
    $.store.set('user_key', null);
  }
  function sessionReady() {
    var user_key = $.store.get('user_key');
    var $div = $("#nav .navbar-inner .nav-collapse");
    var $identity = $("<div/>", {'class': 'identity'});
    if(!user_key || user_key == 'not_logged_in') {
      $identity.append("<a href='/login'><img src='/icons/twitter.png'/> Login</a>");
    } else {
      window.user_key = user_key;
      $("body").addClass('user_key');
      $identity
        .append($("<img/>", 
          {'src': "https://api.twitter.com/1/users/profile_image/" + user_key}))
        .append("<span>" + user_key + " |&nbsp;</span>")
        .append("<a href='/logout' class='logout'>Logout</a>");
    }
    $div.append($identity);
  }
  $(".logout").live('click', function() {
    $.store.set('user_key', null);
  });
  var header = {};
  header[$("body").attr('data-view')] = true;
  $("body").prepend(Handlebars.templates['header'](header));
  $("#content.container").append(Handlebars.templates['footer']());
  $.getJSON('/user_key.json', function(data) {
    $.store.set('user_key', data.user_key);
    sessionReady();
  });
});

// lib/handlebars/base.js
var Handlebars = {};

Handlebars.VERSION = "1.0.beta.2";

Handlebars.helpers  = {};
Handlebars.partials = {};

Handlebars.registerHelper = function(name, fn, inverse) {
  if(inverse) { fn.not = inverse; }
  this.helpers[name] = fn;
};

Handlebars.registerPartial = function(name, str) {
  this.partials[name] = str;
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Could not find property '" + arg + "'");
  }
});

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;


  var ret = "";
  var type = Object.prototype.toString.call(context);

  if(type === "[object Function]") {
    context = context();
  }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      for(var i=0, j=context.length; i<j; i++) {
        ret = ret + fn(context[i]);
      }
    } else {
      ret = inverse(this);
    }
    return ret;
  } else {
    return fn(context);
  }
});

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";

  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + fn(context[i]);
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});

Handlebars.registerHelper('if', function(context, options) {
  if(!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  options.fn = inverse;
  options.inverse = fn;

  return Handlebars.helpers['if'].call(this, context, options);
});

Handlebars.registerHelper('with', function(context, options) {
  return options.fn(context);
});
;
// lib/handlebars/utils.js
Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  for (var p in tmp) {
    if (tmp.hasOwnProperty(p)) { this[p] = tmp[p]; }
  }
};
Handlebars.Exception.prototype = new Error;

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

(function() {
  var escape = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /&(?!\w+;)|[<>"'`]/g;
  var possible = /[&<>"'`]/;

  var escapeChar = function(chr) {
    return escape[chr] || "&amp;";
  };

  Handlebars.Utils = {
    escapeExpression: function(string) {
      // don't escape SafeStrings, since they're already safe
      if (string instanceof Handlebars.SafeString) {
        return string.toString();
      } else if (string == null || string === false) {
        return "";
      }

      if(!possible.test(string)) { return string; }
      return string.replace(badChars, escapeChar);
    },

    isEmpty: function(value) {
      if (typeof value === "undefined") {
        return true;
      } else if (value === null) {
        return true;
      } else if (value === false) {
        return true;
      } else if(Object.prototype.toString.call(value) === "[object Array]" && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  };
})();;
// lib/handlebars/vm.js
Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          return Handlebars.VM.program(fn, data);
        } else if(programWrapper) {
          return programWrapper;
        } else {
          programWrapper = this.programs[i] = Handlebars.VM.program(fn);
          return programWrapper;
        }
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop
    };

    return function(context, options) {
      options = options || {};
      return templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);
    };
  },

  programWithDepth: function(fn, data, $depth) {
    var args = Array.prototype.slice.call(arguments, 2);

    return function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
  },
  program: function(fn, data) {
    return function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials) {
    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, {helpers: helpers, partials: partials});
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in vm mode");
    } else {
      partials[name] = Handlebars.compile(partial);
      return partials[name](context, {helpers: helpers, partials: partials});
    }
  }
};

Handlebars.template = Handlebars.VM.template;

(function() {
  var extensions_hash = {
    'editor_button': 'editor',
    'resource_selection': 'resources',
    'course_nav': 'course nav',
    'user_nav': 'profile nav',
    'account_nav': 'account nav'
  }
  Handlebars.registerHelper('extensions_list', function(context, options) {
    var res = "";
    context = context || [];
    for(var idx = 0; idx < context.length; idx++) {
      if(extensions_hash[context[idx]]) {
        res = res + "<span class='label'>" + extensions_hash[context[idx]] + "</span>&nbsp;";
      }
    }
    return new Handlebars.SafeString(res);
  });
  Handlebars.registerHelper('if_eql', function(context, options) {
    if(context == options.hash['val']) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  Handlebars.registerHelper('if_string', function(context, options) {
    if(typeof(context) == 'string') {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  Handlebars.registerHelper('full_url', function(context, options) {
    if(!context.match(/\/\//)) {
      context = location.protocol + "//" + location.host + context;
    }
    return context;
  });
  Handlebars.registerHelper('stars', function(context, options) {
    context = Math.round(context * 2.0) / 2.0;
    var context_str = context.toString().replace(/\./, '_');
    var title = "No Ratings";
    if(context) {
      title = context + " Star" + (context == 1 ? "" : "s");
    }
    var res = "<span title='" + title + "' class='stars star" + context_str + "'>";
    for(var idx = 0; idx < 5; idx++) {
      res = res + "<img data-star='" + (idx + 1) + "' class='star star" + (idx + 1) + "' src='/blank.png'/> ";
    }
    res = res + "</span>";
    return new Handlebars.SafeString(res);
  });
  Handlebars.registerHelper('small_stars', function(context, options) {
    context = Math.round(context);
    var res = "<span title='" + context + " star" + (context == 1 ? "" : "s") + "' style='line-height: 10px;'>";
    for(var idx = 0; idx < 5; idx++) {
      res = res + "<img style='width: 10px; height: 10px;' class='star" + (idx + 1) + "' src='/star" + (context > idx ? "" : "_empty") + ".png'/> ";
    }
    res = res + "</span>";
    return new Handlebars.SafeString(res);
  });
})();

// Handlebars templates
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['comment'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <img src=\"";
  foundHelper = helpers.user_avatar_url;
  stack1 = foundHelper || depth0.user_avatar_url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user_avatar_url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" style=\"width: 50px; height: 50px;\"/>\n        ";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n            <img src=\"/person.png\" style=\"width: 50px; height: 50px;\"/>\n        ";}

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <a href=\"";
  foundHelper = helpers.user_url;
  stack1 = foundHelper || depth0.user_url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user_url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.user_name;
  stack1 = foundHelper || depth0.user_name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user_name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n        ";
  return buffer;}

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  foundHelper = helpers.user_name;
  stack1 = foundHelper || depth0.user_name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user_name", { hash: {} }); }
  buffer += escapeExpression(stack1) + " \n        ";
  return buffer;}

  buffer += "<div class='comment' id='comment_";
  foundHelper = helpers.id;
  stack1 = foundHelper || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'>\n    <div style=\"float: left;\">\n        ";
  foundHelper = helpers.user_avatar_url;
  stack1 = foundHelper || depth0.user_avatar_url;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(3, program3, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <div style=\"margin-left: 55px;\">\n        <span class=\"user_name\">\n        ";
  foundHelper = helpers.user_url;
  stack1 = foundHelper || depth0.user_url;
  stack2 = helpers['if'];
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(7, program7, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </span>\n        <span class=\"source_name\">";
  foundHelper = helpers.source_name;
  stack1 = foundHelper || depth0.source_name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "source_name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span>\n        <span class='created'>";
  foundHelper = helpers.created;
  stack1 = foundHelper || depth0.created;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "created", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span>\n        <br/>\n        ";
  foundHelper = helpers.rating;
  stack1 = foundHelper || depth0.rating;
  foundHelper = helpers.small_stars;
  stack2 = foundHelper || depth0.small_stars;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "small_stars", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + "<br/>\n        ";
  foundHelper = helpers.comments;
  stack1 = foundHelper || depth0.comments;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "comments", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n    </div>\n    <div style=\"clear: left;\"></div>\n</div>";
  return buffer;});
templates['footer'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<footer class=\"footer\" style=\"text-align: center; padding-top: 5px;\">\n  <p>This site and its contents are <a href=\"https://github.com/whitmer/lti_example\">available on GitHub</a> under the MIT license. Official IMS LTI specs and certifications are found on the <a href=\"http://www.imsglobal.org/lti/\">IMS page</a>.</p>\n</footer>\n";});
templates['header'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this;

function program1(depth0,data) {
  
  
  return " class=\"active\"";}

function program3(depth0,data) {
  
  
  return " class=\"active\"";}

function program5(depth0,data) {
  
  
  return " class=\"active\"";}

function program7(depth0,data) {
  
  
  return "active ";}

  buffer += "<header>\n  <div id=\"nav\" class=\"navbar navbar-fixed-top\">\n    <div class=\"navbar-inner\">\n      <div class=\"container\">\n        <a class=\"brand\" href=\"/index.html\">LTI of Magic</a>\n        <div class=\"nav-collapse\">\n          <ul class=\"nav\">\n            <li";
  foundHelper = helpers.index;
  stack1 = foundHelper || depth0.index;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><a href=\"/index.html\">Home</a></li>\n            <li";
  foundHelper = helpers.talk;
  stack1 = foundHelper || depth0.talk;
  stack2 = helpers['if'];
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><a href=\"/talk.html\">Talk</a></li>\n            <li";
  foundHelper = helpers.tutorials;
  stack1 = foundHelper || depth0.tutorials;
  stack2 = helpers['if'];
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><a href=\"/tutorials.html\">Tutorials</a></li>\n            <li class=\"";
  foundHelper = helpers.coding;
  stack1 = foundHelper || depth0.coding;
  stack2 = helpers['if'];
  tmp1 = self.program(7, program7, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " dropdown\">\n                <a href=\"/code.html\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Coding <span class='caret' style=\"color: #fff;\"></span></a>\n                <ul class=\"dropdown-menu\">\n                    <li><a href=\"/code.html\">Basics</a></li>\n                    <li><a href=\"/extensions.html\">Examples</a></li>\n                    <li><a href=\"/api.html\">API</a></li>\n                    <li class=\"divider\"></li>\n                    <li><a href=\"https://github.com/whitmer/lti_example\">Source</a></li>\n                </ul>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n</header>\n";
  return buffer;});
templates['tool'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "\n    <span class='span2 app'></span>\n";}

function program3(depth0,data) {
  
  
  return "8";}

function program5(depth0,data) {
  
  
  return "3";}

function program7(depth0,data) {
  
  
  return "single_app";}

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <img src='";
  foundHelper = helpers.big_image_url;
  stack1 = foundHelper || depth0.big_image_url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "big_image_url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "' alt=''/>\n                ";
  return buffer;}

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <img src='";
  foundHelper = helpers.image_url;
  stack1 = foundHelper || depth0.image_url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "image_url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "' alt=''/>\n                ";
  return buffer;}

function program13(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                <div class='rating_summary'>\n                    ";
  foundHelper = helpers.ratings_count;
  stack1 = foundHelper || depth0.ratings_count;
  stack2 = helpers['if'];
  tmp1 = self.program(14, program14, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(16, program16, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n            ";
  return buffer;}
function program14(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                        ";
  foundHelper = helpers.avg_rating;
  stack1 = foundHelper || depth0.avg_rating;
  foundHelper = helpers.stars;
  stack2 = foundHelper || depth0.stars;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "stars", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.ratings_count;
  stack1 = foundHelper || depth0.ratings_count;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "ratings_count", { hash: {} }); }
  buffer += escapeExpression(stack1) + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='/comments.png'/> ";
  foundHelper = helpers.comments_count;
  stack1 = foundHelper || depth0.comments_count;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "comments_count", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n                    ";
  return buffer;}

function program16(depth0,data) {
  
  
  return "\n                        No Ratings\n                    ";}

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div style='width: 55px;' class='voter'><a href='https://twitter.com/share' class='twitter-share-button' data-lang='en' data-count='vertical' data-url='";
  foundHelper = helpers.refUrl;
  stack1 = foundHelper || depth0.refUrl;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "refUrl", { hash: {} }); }
  buffer += escapeExpression(stack1) + "' data-text='LTI Tool: ";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'>Tweet</a></div>\n                <div class='voter fb-like' data-send='false' data-layout='box_count' data-width='55' data-show-faces='false' data-href='";
  foundHelper = helpers.refUrl;
  stack1 = foundHelper || depth0.refUrl;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "refUrl", { hash: {} }); }
  buffer += escapeExpression(stack1) + "' style='width: 55px;'></div>\n                <div style='padding-top: 1px; margin-right: 7px;' class='voter'><div class='g-plusone' data-annotation='bubble' data-size='tall' data-width='55' data-href='";
  foundHelper = helpers.refUrl;
  stack1 = foundHelper || depth0.refUrl;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "refUrl", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'></div></div>\n                <div style='clear: both;'></div>\n            ";
  return buffer;}

function program20(depth0,data) {
  
  
  return "\n                <span class='label label-important'>NEW</span>&nbsp;\n            ";}

function program22(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            <div class='ratings_on_hover'>\n                ";
  foundHelper = helpers.ratings_count;
  stack1 = foundHelper || depth0.ratings_count;
  stack2 = helpers['if'];
  tmp1 = self.program(23, program23, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(25, program25, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        ";
  return buffer;}
function program23(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                    ";
  foundHelper = helpers.avg_rating;
  stack1 = foundHelper || depth0.avg_rating;
  foundHelper = helpers.stars;
  stack2 = foundHelper || depth0.stars;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "stars", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.ratings_count;
  stack1 = foundHelper || depth0.ratings_count;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "ratings_count", { hash: {} }); }
  buffer += escapeExpression(stack1) + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='/comments.png'/> ";
  foundHelper = helpers.comments_count;
  stack1 = foundHelper || depth0.comments_count;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "comments_count", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n                ";
  return buffer;}

function program25(depth0,data) {
  
  
  return "\n                    &nbsp;\n                ";}

function program27(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <div class='config alert alert-info'>\n        ";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(28, program28, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  foundHelper = helpers.preview;
  stack1 = foundHelper || depth0.preview;
  stack2 = helpers['if'];
  tmp1 = self.program(43, program43, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  foundHelper = helpers.extensions_or_preview;
  stack1 = foundHelper || depth0.extensions_or_preview;
  stack2 = helpers['if'];
  tmp1 = self.program(46, program46, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    ";
  return buffer;}
function program28(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            ";
  foundHelper = helpers.has_config_url;
  stack1 = foundHelper || depth0.has_config_url;
  stack2 = helpers['if'];
  tmp1 = self.program(29, program29, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(40, program40, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;}
function program29(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                ";
  foundHelper = helpers.config_options;
  stack1 = foundHelper || depth0.config_options;
  stack2 = helpers.each;
  tmp1 = self.program(30, program30, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  foundHelper = helpers.config_urls;
  stack1 = foundHelper || depth0.config_urls;
  stack2 = helpers['if'];
  tmp1 = self.program(35, program35, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(38, program38, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;}
function program30(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3;
  buffer += "\n                    ";
  foundHelper = helpers.type;
  stack1 = foundHelper || depth0.type;
  stack2 = {};
  stack3 = "checkbox";
  stack2['val'] = stack3;
  foundHelper = helpers.if_eql;
  stack3 = foundHelper || depth0.if_eql;
  tmp1 = self.program(31, program31, data);
  tmp1.hash = stack2;
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(33, program33, data);
  if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <br/>\n                ";
  return buffer;}
function program31(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <div class='form-horizontal'><label><input style='margin: -4px 3px 0 0;' type='checkbox' class='config_option' name='";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "' value='";
  foundHelper = helpers.value;
  stack1 = foundHelper || depth0.value;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "value", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'/> ";
  foundHelper = helpers.description;
  stack1 = foundHelper || depth0.description;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "description", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</label></div>\n                    ";
  return buffer;}

function program33(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <div class='form-horizontal'><label>";
  foundHelper = helpers.description;
  stack1 = foundHelper || depth0.description;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "description", { hash: {} }); }
  buffer += escapeExpression(stack1) + ": <input type='text' class='config_option' name='";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "' value='";
  foundHelper = helpers.value;
  stack1 = foundHelper || depth0.value;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "value", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'/></label></div>\n                    ";
  return buffer;}

function program35(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                    ";
  foundHelper = helpers.config_urls;
  stack1 = foundHelper || depth0.config_urls;
  stack2 = helpers.each;
  tmp1 = self.program(36, program36, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  return buffer;}
function program36(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                        <label>";
  foundHelper = helpers.description;
  stack1 = foundHelper || depth0.description;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "description", { hash: {} }); }
  buffer += escapeExpression(stack1) + ": <input type='text' title='copy this URL and paste it into the tool configuration in your LMS' class='config_field' value='";
  foundHelper = helpers.url;
  stack1 = foundHelper || depth0.url;
  foundHelper = helpers.full_url;
  stack2 = foundHelper || depth0.full_url;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "full_url", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + "'/></label>\n                    ";
  return buffer;}

function program38(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                    <label>configuration url: <input type='text' title='copy this URL and paste it into the tool configuration in your LMS' class='config_field' value='";
  foundHelper = helpers.config_url;
  stack1 = foundHelper || depth0.config_url;
  foundHelper = helpers.full_url;
  stack2 = foundHelper || depth0.full_url;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "full_url", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + "'/></label>\n                ";
  return buffer;}

function program40(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                ";
  foundHelper = helpers.config_dir;
  stack1 = foundHelper || depth0.config_dir;
  stack2 = helpers['if'];
  tmp1 = self.program(41, program41, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;}
function program41(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    ";
  foundHelper = helpers.config_dir;
  stack1 = foundHelper || depth0.config_dir;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "config_dir", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n                ";
  return buffer;}

function program43(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            ";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(44, program44, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;}
function program44(depth0,data) {
  
  
  return "\n                <a id='preview' class='btn btn-primary' href='#preview'>Preview</a>\n            ";}

function program46(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            <div class='extensions'>\n                ";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(47, program47, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(49, program49, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  foundHelper = helpers.extensions;
  stack1 = foundHelper || depth0.extensions;
  foundHelper = helpers.extensions_list;
  stack2 = foundHelper || depth0.extensions_list;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "extensions_list", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + "\n            </div>\n        ";
  return buffer;}
function program47(depth0,data) {
  
  
  return "\n                    <span class='label label-info'>preview</span>\n                ";}

function program49(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <a href=\"/index.html?tool=";
  foundHelper = helpers.id;
  stack1 = foundHelper || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "#preview\">\n                        <span class='label label-info'>preview</span></a>\n                ";
  return buffer;}

function program51(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <a name=\"preview\"></a>\n        <div class='ratings'>\n            ";
  foundHelper = helpers.avg_rating;
  stack1 = foundHelper || depth0.avg_rating;
  foundHelper = helpers.stars;
  stack2 = foundHelper || depth0.stars;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "stars", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.ratings_count;
  stack1 = foundHelper || depth0.ratings_count;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "ratings_count", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n            ";
  foundHelper = helpers.comments_count;
  stack1 = foundHelper || depth0.comments_count;
  stack2 = helpers['if'];
  tmp1 = self.program(52, program52, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <form id='add_rating' style=\"display: none;\">\n                <input id=\"rating_star\" type=\"hidden\" name=\"rating\" value=\"\"/>\n                <textarea id=\"rating_comments\" placeholder=\"Type any additional comments here\" style=\"width: 300px; height: 50px;\"></textarea><br/>\n                <button type='submit' class='btn btn-primary'>Submit Comments</button>\n                <button type='button' class='bnt btn-cancel'>No Comment</button>\n            </form>\n            ";
  foundHelper = helpers.comments_count;
  stack1 = foundHelper || depth0.comments_count;
  stack2 = helpers['if'];
  tmp1 = self.program(54, program54, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    ";
  return buffer;}
function program52(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='/comments.png'/> ";
  foundHelper = helpers.comments_count;
  stack1 = foundHelper || depth0.comments_count;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "comments_count", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n            ";
  return buffer;}

function program54(depth0,data) {
  
  
  return "\n                <h3>Recent Comments</h3>\n                <div class='comments'>\n                </div>\n            ";}

function program56(depth0,data) {
  
  
  return "\n    <span class='span2 app'></span>\n";}

  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<span class='span";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(5, program5, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " app ";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(7, program7, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'>\n    <div class='header'>\n        <div class='icon'>\n            <a href='/index.html?tool=";
  foundHelper = helpers.id;
  stack1 = foundHelper || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'>\n                ";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(9, program9, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(11, program11, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </a>\n        </div>\n        <h3>\n            <a href='/index.html?tool=";
  foundHelper = helpers.id;
  stack1 = foundHelper || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n        </h3>\n        <div class='rating'>\n            ";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(13, program13, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  foundHelper = helpers.show_votes;
  stack1 = foundHelper || depth0.show_votes;
  stack2 = helpers['if'];
  tmp1 = self.program(18, program18, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class='description'>\n            ";
  foundHelper = helpers['new'];
  stack1 = foundHelper || depth0['new'];
  stack2 = helpers['if'];
  tmp1 = self.program(20, program20, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  foundHelper = helpers.desc;
  stack1 = foundHelper || depth0.desc;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "desc", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n        </div>\n        ";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers.unless;
  tmp1 = self.program(22, program22, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    ";
  foundHelper = helpers.config_details;
  stack1 = foundHelper || depth0.config_details;
  stack2 = helpers['if'];
  tmp1 = self.program(27, program27, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(51, program51, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</span>\n";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(56, program56, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
templates['tool_preview'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <iframe src=\"";
  foundHelper = helpers.url;
  stack1 = foundHelper || depth0.url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" frameborder=\"0\" style=\"background: #fff; border: 1px solid #ccc; height: ";
  foundHelper = helpers.height;
  stack1 = foundHelper || depth0.height;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "height", { hash: {} }); }
  buffer += escapeExpression(stack1) + "px; width: ";
  foundHelper = helpers.width;
  stack1 = foundHelper || depth0.width;
  stack2 = helpers['if'];
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(4, program4, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ";\"/>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  foundHelper = helpers.width;
  stack1 = foundHelper || depth0.width;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "width", { hash: {} }); }
  buffer += escapeExpression(stack1) + "px";
  return buffer;}

function program4(depth0,data) {
  
  
  return "100%";}

  buffer += "<div class='preview_pane well'>\n    <h2>Tool Preview:</h2>\n    ";
  foundHelper = helpers.preview;
  stack1 = foundHelper || depth0.preview;
  stack2 = helpers['with'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;});
templates['tools_header'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <option value=\"";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</option>\n        ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <option value=\"";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</option>\n        ";
  return buffer;}

  buffer += "<div class=\"filters form-inline well\">\n    <label for=\"category\">Category:</label>\n    <select id=\"category\">\n        <option value=\"all\">All Categories</option>\n        <option value=\"recent\">Recently Added</option>\n        ";
  foundHelper = helpers.categories;
  stack1 = foundHelper || depth0.categories;
  stack2 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </select>\n    \n    <label for=\"level\">Grade Level:</label>\n    <select id=\"level\">\n        <option value=\"all\">All Grade Levels</option>\n        ";
  foundHelper = helpers.levels;
  stack1 = foundHelper || depth0.levels;
  stack2 = helpers.each;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </select>\n    <span id=\"visible_app_count\"></span>\n    Apps Shown\n</div>";
  return buffer;});
})();
