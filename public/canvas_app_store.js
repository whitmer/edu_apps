define('jst/apps/app_overlay', ["compiled/handlebars_helpers"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['apps/app_overlay'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n    <div class='extensions'>\n    <h3>";
  stack1 = "Extensions";
  stack2 = "extensions";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h3>\n    <ul>\n    ";
  foundHelper = helpers.has_editor_button;
  stack1 = foundHelper || depth0.has_editor_button;
  stack2 = helpers['if'];
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  foundHelper = helpers.has_resource_selection;
  stack1 = foundHelper || depth0.has_resource_selection;
  stack2 = helpers['if'];
  tmp1 = self.program(4, program4, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  foundHelper = helpers.has_course_nav;
  stack1 = foundHelper || depth0.has_course_nav;
  stack2 = helpers['if'];
  tmp1 = self.program(6, program6, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  foundHelper = helpers.has_account_nav;
  stack1 = foundHelper || depth0.has_account_nav;
  stack2 = helpers['if'];
  tmp1 = self.program(8, program8, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  foundHelper = helpers.has_user_nav;
  stack1 = foundHelper || depth0.has_user_nav;
  stack2 = helpers['if'];
  tmp1 = self.program(10, program10, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n    </div>\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <li>";
  stack1 = "This tool adds a button to the rich content editor";
  stack2 = "has_editor_button";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</li>\n    ";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <li>";
  stack1 = "This tool allows searching when adding links to modules";
  stack2 = "has_resource_selection";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</li>\n    ";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <li>";
  stack1 = "This tool adds a link to course navigation";
  stack2 = "has_course_nav";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</li>\n    ";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <li>";
  stack1 = "This tool adds a link to account navigation";
  stack2 = "has_account_nav";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</li>\n    ";
  return buffer;}

function program10(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <li>";
  stack1 = "This tool adds a link to user navigation";
  stack2 = "has_user_nav";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</li>\n    ";
  return buffer;}

function program12(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n    <fieldset><legend>";
  stack1 = "Tool Settings";
  stack2 = "tool_settings";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</legend>\n";
  return buffer;}

function program14(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n    <div class='option'>";
  stack1 = "Consumer Key:";
  stack2 = "consumer_key";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " <input type='text' class='consumer_key' style='width: 100px;'/></div>\n    <div class='option'>";
  stack1 = "Shared Secret:";
  stack2 = "shared_secret";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " <input type='text' class='secret' style='width: 100px;'/></div>\n";
  return buffer;}

function program16(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    ";
  foundHelper = helpers.checkbox_input;
  stack1 = foundHelper || depth0.checkbox_input;
  stack2 = helpers['if'];
  tmp1 = self.program(17, program17, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  foundHelper = helpers.text_input;
  stack1 = foundHelper || depth0.text_input;
  stack2 = helpers['if'];
  tmp1 = self.program(19, program19, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;}
function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class='option'>\n            <label><input type='checkbox' class='config_option' name='";
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
  buffer += escapeExpression(stack1) + "</label>\n        </div>\n    ";
  return buffer;}

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class='option'>\n            <label>";
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
  buffer += escapeExpression(stack1) + "'/></label>\n        </div>\n    ";
  return buffer;}

function program21(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n    <div class='option'>";
  stack1 = "Resource:";
  stack2 = "resource";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n        <select id='base_url'>\n        ";
  foundHelper = helpers.config_url;
  stack1 = foundHelper || depth0.config_url;
  stack2 = helpers.each;
  tmp1 = self.program(22, program22, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </select>\n    </div>\n";
  return buffer;}
function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <option value='";
  foundHelper = helpers.url;
  stack1 = foundHelper || depth0.url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.description;
  stack1 = foundHelper || depth0.description;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "description", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</option>\n        ";
  return buffer;}

function program24(depth0,data) {
  
  
  return "\n    </fieldset>\n";}

function program26(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n    <div class='in_current_context ui-state-warning ui-corner-all'>\n        <i class='icon-warning'></i>\n        ";
  stack1 = "This tool has already been installed in this %{context_name}. Installing it again may cause problems, depending on the tool.";
  stack2 = "already_in_context";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n";
  return buffer;}

function program28(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    ";
  foundHelper = helpers.in_higher_context;
  stack1 = foundHelper || depth0.in_higher_context;
  stack2 = helpers['if'];
  tmp1 = self.program(29, program29, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;}
function program29(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, stack4;
  buffer += "\n        <div class='in_higher_context ui-state-warning ui-corner-all'>\n            <i class='icon-warning'></i>\n            ";
  stack1 = "This tool is already installed. You can override if you want by adding it to this %{context_name}";
  stack2 = "already_in_upper_context";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    ";
  return buffer;}

  buffer += "<div class='padding'>\n<div class='logo'>\n  <img src='";
  foundHelper = helpers.big_image_url;
  stack1 = foundHelper || depth0.big_image_url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "big_image_url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'/>\n</div>\n<h2>";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h2>\n<div class='desc'>";
  foundHelper = helpers.description;
  stack1 = foundHelper || depth0.description;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "description", { hash: {} }); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n<div style='clear: left;'></div>\n\n";
  foundHelper = helpers.has_extensions;
  stack1 = foundHelper || depth0.has_extensions;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  foundHelper = helpers.has_settings;
  stack1 = foundHelper || depth0.has_settings;
  stack2 = helpers['if'];
  tmp1 = self.program(12, program12, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  foundHelper = helpers.any_key;
  stack1 = foundHelper || depth0.any_key;
  stack2 = helpers.unless;
  tmp1 = self.program(14, program14, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n";
  foundHelper = helpers.config_options;
  stack1 = foundHelper || depth0.config_options;
  stack2 = helpers.each;
  tmp1 = self.program(16, program16, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  foundHelper = helpers.multi_configs;
  stack1 = foundHelper || depth0.multi_configs;
  stack2 = helpers['if'];
  tmp1 = self.program(21, program21, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  foundHelper = helpers.has_settings;
  stack1 = foundHelper || depth0.has_settings;
  stack2 = helpers['if'];
  tmp1 = self.program(24, program24, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  foundHelper = helpers.in_current_context;
  stack1 = foundHelper || depth0.in_current_context;
  stack2 = helpers['if'];
  tmp1 = self.program(26, program26, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(28, program28, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div style='margin: 10px 0 20px;'>\n    <button class='button add'>\n        <img src='/images/add.png'/> \n        ";
  stack1 = "Add Tool to this %{context_name}";
  stack2 = "add_tool_to_context";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </button>\n    <button class='button button-secondary cancel'>";
  stack1 = "Cancel";
  stack2 = "cancel";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n</div>\n\n<div class=\"all_ratings\">\n  <div class=\"stars\">\n      <h3>";
  stack1 = "Rate this Tool:";
  stack2 = "rate_this_tool";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "&nbsp;&nbsp;\n      <a href=\"#\" class=\"star star1\" data-star=\"1\" title=\"";
  stack1 = "1 Star";
  stack2 = "one_star";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><img src=\"/images/star.png\"/></a>\n      <a href=\"#\" class=\"star star2\" data-star=\"2\" title=\"";
  stack1 = "2 Stars";
  stack2 = "two_stars";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><img src=\"/images/star.png\"/></a>\n      <a href=\"#\" class=\"star star3\" data-star=\"3\" title=\"";
  stack1 = "3 Stars";
  stack2 = "three_stars";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><img src=\"/images/star.png\"/></a>\n      <a href=\"#\" class=\"star star4\" data-star=\"4\" title=\"";
  stack1 = "4 Stars";
  stack2 = "four_stars";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><img src=\"/images/star.png\"/></a>\n      <a href=\"#\" class=\"star star5\" data-star=\"5\" title=\"";
  stack1 = "5 Stars";
  stack2 = "five_stars";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><img src=\"/images/star.png\"/></a>\n      </h3>\n      <form id=\"app_review_form\" action=\"/apps/";
  foundHelper = helpers.id;
  stack1 = foundHelper || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/comments\" method=\"POST\" style=\"display: none;\">\n          <input type=\"hidden\" name=\"app[rating]\" class=\"app_rating\" value=\"\"/>\n          <textarea name=\"app[comments]\" placeholder=\"";
  stack1 = "Enter Comments...";
  stack2 = "enter_comments";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" title=\"Comments\" style=\"width: 400px; height: 35px;\"></textarea><br/>\n          <button type='submit' class='button submit_button'>";
  stack1 = "Post Comments";
  stack2 = "post_comments";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n          <button type='button' class='button button-secondary cancel_comment_button'>";
  stack1 = "No Comment";
  stack2 = "no_comment";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n      </form>\n  </div>\n  <h3>";
  stack1 = "Comments:";
  stack2 = "comments";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h3>\n  <div class='ratings for_";
  foundHelper = helpers.id;
  stack1 = foundHelper || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'>\n      ";
  stack1 = "Loading Comments...";
  stack2 = "loading_comments";
  stack3 = {};
  stack4 = "apps.app_overlay";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>\n</div>";
  return buffer;});
  
  
  return templates['apps/app_overlay'];
});

define('jst/apps/app_rating', ["compiled/handlebars_helpers"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['apps/app_rating'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<div class='rating stars_";
  foundHelper = helpers.rating;
  stack1 = foundHelper || depth0.rating;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "rating", { hash: {} }); }
  buffer += escapeExpression(stack1) + " rating_";
  foundHelper = helpers.id;
  stack1 = foundHelper || depth0.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'>\n    <img src=\"";
  foundHelper = helpers.avatar_path;
  stack1 = foundHelper || depth0.avatar_path;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "avatar_path", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" alt=\"\"/>\n    <div class='date'>\n        ";
  foundHelper = helpers.created;
  stack1 = foundHelper || depth0.created;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "created", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n    </div>\n    <div class='user_name'>\n        ";
  foundHelper = helpers.user_name;
  stack1 = foundHelper || depth0.user_name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "user_name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n    </div>\n    <div class='stars star";
  foundHelper = helpers.rating;
  stack1 = foundHelper || depth0.rating;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "rating", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'>\n        <span class=\"star star1\"><img src=\"/images/star.png\"/></span>\n        <span class=\"star star2\"><img src=\"/images/star.png\"/></span>\n        <span class=\"star star3\"><img src=\"/images/star.png\"/></span>\n        <span class=\"star star4\"><img src=\"/images/star.png\"/></span>\n        <span class=\"star star5\"><img src=\"/images/star.png\"/></span>\n    </div>\n    <div class='comments'>\n        ";
  foundHelper = helpers.comments;
  stack1 = foundHelper || depth0.comments;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "comments", { hash: {} }); }
  buffer += escapeExpression(stack1) + "       \n    </div>\n</div>\n";
  return buffer;});
  
  
  return templates['apps/app_rating'];
});

define('jst/apps/app', ["compiled/handlebars_helpers"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['apps/app'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, stack4, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class='stars star";
  foundHelper = helpers.stars;
  stack1 = foundHelper || depth0.stars;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "stars", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'>\n        <span class=\"star star1\"><img src=\"/images/star.png\"/></span>\n        <span class=\"star star2\"><img src=\"/images/star.png\"/></span>\n        <span class=\"star star3\"><img src=\"/images/star.png\"/></span>\n        <span class=\"star star4\"><img src=\"/images/star.png\"/></span>\n        <span class=\"star star5\"><img src=\"/images/star.png\"/></span>\n        (";
  foundHelper = helpers.ratings;
  stack1 = foundHelper || depth0.ratings;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "ratings", { hash: {} }); }
  buffer += escapeExpression(stack1) + ")\n    </div>\n    ";
  return buffer;}

  buffer += "<div class='tool stars_";
  foundHelper = helpers.stars_class;
  stack1 = foundHelper || depth0.stars_class;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "stars_class", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'>\n  <div style='text-align: center;'><img class='logo' src='";
  foundHelper = helpers.big_image_url;
  stack1 = foundHelper || depth0.big_image_url;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "big_image_url", { hash: {} }); }
  buffer += escapeExpression(stack1) + "'/></div>\n  <div class='details'>\n    <span class='name'>";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span>\n    <div style='float: right;'>";
  stack1 = "%{uses} hits/month";
  stack2 = "hits_per_month";
  stack3 = {};
  stack4 = "apps.app";
  stack3['scope'] = stack4;
  foundHelper = helpers['t'];
  stack4 = foundHelper || depth0['t'];
  tmp1 = {};
  tmp1.hash = stack3;
  if(typeof stack4 === functionType) { stack1 = stack4.call(depth0, stack2, stack1, tmp1); }
  else if(stack4=== undef) { stack1 = helperMissing.call(depth0, "t", stack2, stack1, tmp1); }
  else { stack1 = stack4; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    ";
  foundHelper = helpers.has_enough_ratings;
  stack1 = foundHelper || depth0.has_enough_ratings;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class='desc'>";
  foundHelper = helpers.abbreviated_description;
  stack1 = foundHelper || depth0.abbreviated_description;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "abbreviated_description", { hash: {} }); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n  </div>\n</div>\n";
  return buffer;});
  
  
  return templates['apps/app'];
});

define([
  'i18n!external_tools',
  'jquery' /* $ */,
  'underscore', 
  'ENV',
  'compiled/userSettings',
  "compiled/handlebars_helpers",
  'jquery.instructure_forms' /* formSubmit, fillFormData */,
  'jqueryui/dialog',
  'jquery.instructure_misc_plugins' /* confirmDelete, showIf */,
  'jquery.instructure_date_and_time',
  'jquery.templateData' /* fillTemplateData, getTemplateData */
], function(I18n, $, _, ENV, userSettings, Handlebars) {

if(!$("#external_tools").length) { return; }
$("#external_tools").attr('data-app_center_enabled', 'true');
$("#tab-tools > .button-container").appendTo($("#external_tools"));
var app = Handlebars.templates['apps/app'];
var app_rating = Handlebars.templates['apps/app_rating'];
var app_overlay = Handlebars.templates['apps/app_overlay'];
ENV.APP_CENTER_BASE_URL = "https://lti-examples.heroku.com";

$(document).ready(function() {
  // App Store Code
  var baseUrl = ENV.APP_CENTER_BASE_URL;
  var lastCategory = userSettings.get('last_external_tool_category');
  var lastLevel = userSettings.get('last_external_tool_level');
  var $tools = $("#external_tools");
  var existingTools = [];
  if($tools.length && $tools.attr('data-app_center_enabled')) {
    $tools.hide();
    var $content = $("<div/>", {'id': 'app_list'});
    $content.html("<div style='padding: 20px;'>" + I18n.t('messages.loading_apps', "Loading Apps...") + "</div>");
    $.ajaxJSON($(".external_tools_url").attr('href') + "?include_parents=1", 'GET', {}, function(data) {
      existingTools = data;
    });
    var appCenterTools = [];
    function getAppCenterTools(url) {
      $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(data) {
          appCenterTools = appCenterTools.concat(data['objects']);
          if(data['meta'] && data['meta']['next']) {
            getAppCenterTools(data['meta']['next']);
          } else {
            appCenterToolsLoaded();
          }
        },
        timeout: 5000,
        error: function() {
          $tools.show();
          $content.hide();
          $.flashError(I18n.t('errors.loading_app_center', 'There was a problem loading the App Center. Please contact your administrator to make sure the App Center is properly configured.'));
        }
      });
    };
    getAppCenterTools(baseUrl + "/api/v1/apps");
    function appCenterToolsLoaded() {
      var data = appCenterTools;
      if(data.length === 0) {
        $content.remove();
        $("#external_tools").show();
        return;
      }
      var tools = [];
      var categories = [], levels = [];
      data = data.sort(function(a, b) {
        var diff = (b.uses || 0) - (a.uses || 0);
        if(diff == 0) {
          if(a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else if(a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        } else {
          return diff;
        }
      });
      for(var idx = 0; idx < data.length; idx++) {
        var tool = data[idx];
        if(tool.id == 'bumpin' || tool.id == 'titanpad' || !tool.config_url) {
          continue;
        }

        tool.uses = tool.uses || 0;
        tool.stars_css = tool.ratings_average ? (Math.round(tool.ratings_average * 2) / 2).toString().replace(/\./, '_') : "n_a";
        tool.stars = tool.ratings_average || "N/A";
        tool.ratings = tool.ratings_count || 0;
        tool.comments = tool.comments_count || 0;
        tool.description = tool.description || tool.short_description;
        tool.multi_configs = tool.config_url && typeof(tool.config_url) != 'string';
        tool.has_settings = !tool.any_key || tool.config_options || tool.multi_configs;
        if(tool.extensions) {
          tool.has_extensions = 0;
          for(var jdx = 0; jdx < tool.extensions.length; jdx++) {
            tool.has_extensions++;
            tool['has_' + tool.extensions[jdx]] = true;
          }
          if(tool.has_account_nav && !$("#current_context_code").text().match(/^account/).text() ) {
            tool.has_extensions--;
            tool.has_account_nav = false;
          }
          if(tool.has_user_nav && $("#current_context_code").text() != "account_" + $("#domain_root_account_id").text()) {
            tool.has_extensions--;
            tool.has_user_nav = false;
          }
        }
        if(tool.config_url && !tool.pending && tool.id != 'bumpin' && tool.id != 'titanpad') {
          tools.push(tool);
          if(tool.categories) {
            for(var jdx = 0; jdx < tool.categories.length; jdx++) {
              categories.push(tool.categories[jdx]);
            }
          }
          if(tool.levels) {
            for(var jdx = 0; jdx < tool.levels.length; jdx++) {
              levels.push(tool.levels[jdx]);
            }
          }
        }
      }
      categories = _.uniq(categories).sort();
      levels = _.uniq(levels);
      var $filters = $("<div/>", {'id': 'tool_filters'});
      var $category_select = $("<select/>", {'class': 'filter', 'id': 'category_filter'});
      var $level_select = $("<select/>", {'class': 'filter', 'id': 'level_filter'});
      $category_select.append($("<option/>", {'value': 'all'}).text(I18n.t('options.all_categories', "All Categories")));
      $category_select.append($("<option/>", {'value': 'new'}).text(I18n.t('options.recently_added', "Recently Added")));
      $level_select.append($("<option/>", {'value': 'all'}).text(I18n.t('options.all_grade_levels', "All Grade Levels")));
      for(var idx = 0; idx < categories.length; idx++) {
        $category_select.append($("<option/>", {'value': categories[idx]}).text(categories[idx]));
      }
      $category_select.append($("<option/>", {'value': 'installed'}).text(I18n.t('options.installed_tools', "Installed Tools")));
      for(var idx = 0; idx < levels.length; idx++) {
        $level_select.append($("<option/>", {'value': levels[idx]}).text(levels[idx]));
      }
      function reFilter() {
        var category = $category_select.val();
        var level = $level_select.val();
        userSettings.set('last_external_tool_category', category);
        userSettings.set('last_external_tool_level', level);
        $level_select.show();
        $content.find(".overlay").removeClass('show');
        $content.find(".tools").show().scrollTop(0);
        $("#external_tools").hide();
        if(category == 'installed') {
          $level_select.hide();
          $content.find(".tools").hide();
          $("#external_tools").show();
        }
        $content.find(".tool").hide().each(function() {
          var tool = $(this).data('tool');
          var match = true;
          if(category == 'new' && !tool['new']) {
            match = false;
          } else if(category != 'new' && category != 'all' && $.inArray(category, tool.categories) == -1) {
            match = false;
          }
          if(level != 'all' && $.inArray(level, tool.levels) == -1) {
            match = false;
          }
          if(match) { $(this).show(); }
        });
      }
      $category_select.val(lastCategory).change(reFilter);
      $level_select.val(lastLevel).change(reFilter).change();
      $filters.append(I18n.t('messages.filter', "Filter: ")).append($category_select).append("&nbsp;").append($level_select);
      $content.empty().append("<div class='overlay'>overlay</div>").append($filters);
      var $tools = $("<div/>", {'class': 'tools'});
      $content.append($tools);
      for(var idx = 0; idx < tools.length; idx++) {
        var tool = tools[idx];
        tool.uses = tool.uses || 0;
        tool.abbreviated_description = tool.description.split(/<br\/>/)[0];
        tool.has_enough_ratings = tool.ratings > 0;
        
        var $tool = $(app(tool));
        $tool.data('tool', tool);
        $tools.append($tool);
      }
      $tools.append("<div style='clear: left;'></div>");
      
      $category_select.change();
      $(window).resize();
    };
    $tools.before($content);
    $content.delegate('.cancel', 'click', function(event) {
      $content.find(".overlay").removeClass('show');
    });
    $content.delegate('.add', 'click', function(event) {
      var $button = $(this);
      var $overlay = $content.find(".overlay");
      var tool = $overlay.data('tool');
      var url = tool.config_url;
      if($overlay.find("#base_url").length) {
        url = $overlay.find("#base_url").val();
      }
      var append = url.match(/\?/) ? "&" : "?";
      $(".config_option").each(function() {
        if($(this).attr('type') != 'checkbox' || $(this).attr('checked')) {
          append = append + encodeURIComponent($(this).attr('name')) + "=" + encodeURIComponent($(this).val()) + "&";
        }
      });
      append = append.substring(0, append.length - 1);
      url = url + append;
      var $key = $overlay.find(".consumer_key");
      var $secret = $overlay.find(".secret");
      if($key.length && !$.trim($key.val())) {
        $key.errorBox(I18n.t('errors.required_field', "This field is required")).css('zIndex', 999);
        return;
      }
      if($secret.length && !$.trim($secret.val())) {
        $secret.errorBox(I18n.t('errors.required_field', "This field is required")).css('zIndex', 999);
        return;
      }
      var key = $key.val() || "key-" + Math.round(Math.random() * 9999999);
      var secret = $secret.val() || "secret";
      var postUrl = $(".external_tools_url").attr('href');
      var originalTool = tool;
      var params = {
        'external_tool[consumer_key]': key,
        'external_tool[shared_secret]': secret,
        'external_tool[config_type]': 'by_url',
        'external_tool[config_url]': url
      }
      $overlay.find("button").attr('disabled', true);
      $button.html("<img src='/images/add.png'/> " + I18n.t('messages.adding_tool', "Adding Tool..."));
      $.ajaxJSON(postUrl, 'POST', params, function(tool) {
        existingTools.push(tool);
        var $tool = $("#external_tool_blank").clone(true).removeAttr('id');
        $("#external_tools .button-container").before($tool);
        $tool.fillTemplateData({
          data: tool,
          dataValues: ['id', 'workflow_state'],
          hrefValues: ['id'],
          id: 'external_tool_' + tool.id
        });
        $tool
          .toggleClass('has_editor_button', tool.has_editor_button)
          .toggleClass('has_resource_selection', tool.has_resource_selection)
          .toggleClass('has_course_navigation', tool.has_course_navigation)
          .toggleClass('has_user_navigation', tool.has_user_navigation)
          .toggleClass('has_account_navigation', tool.has_account_navigation);
        $tool.find(".tool_url").showIf(tool.url).end()
          .find(".tool_domain").showIf(tool.domain);
        $tool.show();
        $.flashMessage(originalTool.name + " Successfully Added!");
        $content.find(".overlay").removeClass('show');
      }, function() {
        $overlay.find("button").attr('disabled', false);
        $button.html("<img src='/images/add.png'/> " + I18n.t('messages.adding_failed', "Adding Failed"));
      });
    });
    $content.delegate('.tool', 'click', function(event) {
      var tool = $(this).data('tool');
      if($(event.target).closest('a').length) { return; }
      var $overlay = $content.find(".overlay")
      tool.context_name = $("#current_context_code").text().match(/account/) ? I18n.t('account', "Account") : I18n.t('course', "Course");
      for(var idx = 0; idx < (tool.config_options || []).length; idx++) {
        tool.config_options[idx].checkbox_input = tool.config_options[idx].type == 'checkbox';
        tool.config_options[idx].text_input = tool.config_options[idx].type == 'text';
      }
      
      tool.in_current_context = $.grep(existingTools, function(elem, i) { return elem.tool_id && elem.tool_id == tool.id && (elem.context_type.toLowerCase() + "_" + elem.context_id) == ENV.context_asset_string }).length > 0;
      tool.in_higher_context = $.grep(existingTools, function(elem, i) { return elem.tool_id && elem.tool_id == tool.id && (elem.context_type.toLowerCase() + "_" + elem.context_id) != ENV.context_asset_string }).length > 0;
      $overlay.html(app_overlay(tool))
      $overlay.scrollTop(0);
      if(tool.user_rating) {
        $content.find(".stars").attr('class', 'stars fixed star' + tool.user_rating.rating);
      }
      function populateComments(data) {
        for(var idx = 0; idx < data.length; idx++) {
          var rating = data[idx];
          rating.created = $.parseFromISO(rating.created_at).datetime_formatted;
          var $rating = $(app_rating(rating));
          $rating.find(".stars").addClass('star' + rating.rating).attr('title', rating.rating + " Stars");
          $overlay.find(".ratings.for_" + tool.id).append($rating);
        }
      }
      if(INST['comments_for_' + tool.id]) {
        $content.find(".ratings").empty();
        populateComments(INST['comments_for_' + tool.id]);
      } else if(tool.comments == 0) {
        $content.find(".ratings").empty().text(I18n.t('messages.no_comments', "No Comments"));
      } else {
        $.ajax({
          url: baseUrl + "/api/v1/apps/" + tool.id + "/reviews",
          dataType: 'jsonp',
          success: function(data) {
            $content.find(".ratings").empty();
            INST['comments_for_' + tool.id] = data['objects'];
            populateComments(data['objects']);
          }
        })
      }
      $overlay.data('tool', tool);
      $overlay.addClass('show');
    });
    $content.delegate("#app_review_form", 'submit', function(event) {
      event.preventDefault();
      var $form = $(this);
      $form.find("button").attr('disabled', true).filter(".submit_button").text(I18n.t('messages.posting_comment', "Posting Comment..."));
      $.ajaxJSON($form.attr('action'), 'POST', $form.getFormData(), function(data) {
        INST['comments_for_' + data.tool_id] = _.reject(INST['comments_for_' + data.tool_id] || [], function(t) { return t.tool_id == data.tool_id });
        INST['comments_for_' + data.tool_id].unshift(data);
        
        $form.find("button").attr('disabled', false).filter(".submit_button").text(I18n.t('messages.post_comment', "Post Comment"));
        $content.find(".rating.rating_" + data.id).remove();
        data.created = $.parseFromISO(data.created_at).datetime_formatted;
        var $rating = $(app_rating(data));
        $content.find(".ratings").prepend($rating);
        $form.slideUp();
      }, function() {
        $form.find("button").attr('disabled', false).filter(".submit_button").text(I18n.t('messages.posting_failed', "Posting Comment Failed"));
      });
    });
    $content.delegate('.cancel_comment_button', 'click', function() {
      $("#app_review_form").slideUp();
    });
    $content.delegate('.overlay > .stars .star', 'mouseover', function() {
      // if they've already rated it, show that rating and lose the hover stuff
      if($(".overlay > .stars").hasClass('fixed')) { return; }
      $(".overlay > .stars").attr('class', 'stars star' + $(this).attr('data-star'));
    })
    .delegate('.overlay > .stars .star', 'mouseout', function() {
      // if they've already rated it, keep the set rating
      if($(".overlay > .stars").hasClass('fixed')) { return; }
      $(".overlay > .stars").attr('class', 'stars');
    })
    .delegate('.overlay .star', 'click', function(event) {
      event.preventDefault();
      var $form = $("#app_review_form")
      $form.slideDown();
      var url = $form.attr('action');
      $(".overlay .stars").attr('class', 'stars fixed star' + $(this).attr('data-star'));
      $form.find(".app_rating").val($(this).attr('data-star'));
      $.ajaxJSON(url, 'POST', {'app[rating]': $(this).attr('data-star')}, function(data) {
        $content.find(".ratings.for_" + data.tool_id + " .rating.rating_" + data.id)
          .attr('class', 'rating rating_' + data.id + ' star' + data.rating)
          .find('.stars').attr('class', 'stars star' + data.rating);
      }, function() {
        $.flashError(I18n.t('errors.rating_not_saved', "Rating was not saved, please try again"));
      });
    });
  }
  $("#account_settings_tabs").bind('tabsshow', function() {
    $(window).resize();
  });
  $(window).resize(function() {
    var width = $("#tab-tools:visible").width();
    if(!width) { return; }
    var margin = ((width - 16) % 261) / 2;
    $("#app_list .tools").css({'paddingLeft': margin, 'paddingRight': margin});
  });
});
});
