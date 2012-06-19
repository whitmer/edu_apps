(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['comment'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", foundHelper, self=this;


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
  
  var buffer = "", stack1, stack2;
  buffer += "\n                ";
  foundHelper = helpers.ratings_count;
  stack1 = foundHelper || depth0.ratings_count;
  stack2 = helpers['if'];
  tmp1 = self.program(10, program10, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(12, program12, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;}
function program10(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                    ";
  foundHelper = helpers.avg_rating;
  stack1 = foundHelper || depth0.avg_rating;
  foundHelper = helpers.stars;
  stack2 = foundHelper || depth0.stars;
  if(typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, { hash: {} }); }
  else if(stack2=== undef) { stack1 = helperMissing.call(depth0, "stars", stack1, { hash: {} }); }
  else { stack1 = stack2; }
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.ratings_count;
  stack1 = foundHelper || depth0.ratings_count;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "ratings_count", { hash: {} }); }
  buffer += escapeExpression(stack1) + ") <img src='/comments.png'/> ";
  foundHelper = helpers.comments_count;
  stack1 = foundHelper || depth0.comments_count;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "comments_count", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n                ";
  return buffer;}

function program12(depth0,data) {
  
  
  return "\n                    No Ratings\n                ";}

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div style='width: 55px; margin-right: 7px;' class='voter'><a href='https://twitter.com/share' class='twitter-share-button' data-lang='en' data-count='vertical' data-url='";
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
  buffer += escapeExpression(stack1) + "' style='width: 55px;'></div>\n                <div style='padding-top: 1px;' class='voter'><div class='g-plusone' data-annotation='bubble' data-size='tall' data-width='55' data-href='";
  foundHelper = helpers.refUrl;
  stack1 = foundHelper || depth0.refUrl;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "refUrl", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'></div></div>\n                <div style='clear: both;'></div>\n            ";
  return buffer;}

function program16(depth0,data) {
  
  
  return "\n                <span class='label label-important'>NEW</span>&nbsp;\n            ";}

function program18(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <div class='config alert alert-info'>\n        ";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(19, program19, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  foundHelper = helpers.preview;
  stack1 = foundHelper || depth0.preview;
  stack2 = helpers['if'];
  tmp1 = self.program(34, program34, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  foundHelper = helpers.extensions_or_preview;
  stack1 = foundHelper || depth0.extensions_or_preview;
  stack2 = helpers['if'];
  tmp1 = self.program(37, program37, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    ";
  return buffer;}
function program19(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            ";
  foundHelper = helpers.config_url;
  stack1 = foundHelper || depth0.config_url;
  stack2 = helpers['if'];
  tmp1 = self.program(20, program20, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(31, program31, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;}
function program20(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                ";
  foundHelper = helpers.config_options;
  stack1 = foundHelper || depth0.config_options;
  stack2 = helpers.each;
  tmp1 = self.program(21, program21, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  foundHelper = helpers.config_url;
  stack1 = foundHelper || depth0.config_url;
  foundHelper = helpers.if_string;
  stack2 = foundHelper || depth0.if_string;
  tmp1 = self.program(26, program26, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(28, program28, data);
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;}
function program21(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3;
  buffer += "\n                    ";
  foundHelper = helpers.type;
  stack1 = foundHelper || depth0.type;
  stack2 = {};
  stack3 = "checkbox";
  stack2['val'] = stack3;
  foundHelper = helpers.if_eql;
  stack3 = foundHelper || depth0.if_eql;
  tmp1 = self.program(22, program22, data);
  tmp1.hash = stack2;
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(24, program24, data);
  if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <br/>\n                ";
  return buffer;}
function program22(depth0,data) {
  
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

function program24(depth0,data) {
  
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

function program26(depth0,data) {
  
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

function program28(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                    ";
  foundHelper = helpers.config_url;
  stack1 = foundHelper || depth0.config_url;
  stack2 = helpers.each;
  tmp1 = self.program(29, program29, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  return buffer;}
function program29(depth0,data) {
  
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

function program31(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                ";
  foundHelper = helpers.config_directions;
  stack1 = foundHelper || depth0.config_directions;
  stack2 = helpers['if'];
  tmp1 = self.program(32, program32, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;}
function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    ";
  foundHelper = helpers.config_directions;
  stack1 = foundHelper || depth0.config_directions;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "config_directions", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n                ";
  return buffer;}

function program34(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            ";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(35, program35, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;}
function program35(depth0,data) {
  
  
  return "\n                <button id='preview' class='btn btn-primary'>Preview</button>\n            ";}

function program37(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            <div class='extensions'>\n                ";
  foundHelper = helpers.preview;
  stack1 = foundHelper || depth0.preview;
  stack2 = helpers['if'];
  tmp1 = self.program(38, program38, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
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
function program38(depth0,data) {
  
  
  return "\n                    <span class='label label-info'>preview</span>&nbsp;\n                ";}

function program40(depth0,data) {
  
  
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
  buffer += escapeExpression(stack1) + "'>\n                <img src='";
  foundHelper = helpers.image_url;
  stack1 = foundHelper || depth0.image_url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "image_url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "' alt=''/>\n            </a>\n        </div>\n        <h3>\n            <a href='/index.html?tool=";
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
  tmp1 = self.program(9, program9, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  foundHelper = helpers.show_votes;
  stack1 = foundHelper || depth0.show_votes;
  stack2 = helpers['if'];
  tmp1 = self.program(14, program14, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class='description'>\n            ";
  foundHelper = helpers['new'];
  stack1 = foundHelper || depth0['new'];
  stack2 = helpers['if'];
  tmp1 = self.program(16, program16, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  foundHelper = helpers.description;
  stack1 = foundHelper || depth0.description;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "description", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n        </div>\n    </div>\n    ";
  foundHelper = helpers.config_details;
  stack1 = foundHelper || depth0.config_details;
  stack2 = helpers['if'];
  tmp1 = self.program(18, program18, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class='ratings'>\n    </div>\n</span>\n";
  foundHelper = helpers.single_tool;
  stack1 = foundHelper || depth0.single_tool;
  stack2 = helpers['if'];
  tmp1 = self.program(40, program40, data);
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
})();