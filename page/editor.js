// Generated by CoffeeScript 1.4.0

define(function(require, exports) {
  var curr_tag, input, jump, log, tag_code, tag_pre, utils;
  log = function() {
    return console.log.apply(console, arguments);
  };
  input = document.createElement("input");
  curr_tag = {};
  jump = function(next) {
    var last, selection;
    last = curr_tag;
    curr_tag = next;
    selection = last.querySelector(".selection");
    log("selection", selection);
    if (selection != null) {
      last.removeChild(selection);
    }
    input.value = next.textContent;
    if (last.textContent === "") {
      last.parentNode.removeChild(last);
    }
    return input.onkeyup();
  };
  tag_code = function() {
    var code;
    code = document.createElement("code");
    code.onclick = function() {
      return jump(code);
    };
    return code;
  };
  tag_pre = function() {
    return document.createElement("pre");
  };
  utils = require("./utils");
  exports.editor = function(elem) {
    var editor, update;
    editor = elem.querySelector(".cirru-editor");
    curr_tag = tag_code();
    elem.appendChild(input);
    editor.appendChild(curr_tag);
    update = function() {
      var left;
      curr_tag.innerHTML = utils.input(input);
      left = curr_tag.querySelector(".selection").offsetLeft;
      return curr_tag.scrollLeft = left - 100;
    };
    input.onkeypress = update;
    input.onkeyup = update;
    elem.onclick = function(click) {
      input.focus();
      return click.returnValue = false;
    };
    return input.onkeydown = function(down) {
      var new_tag, next, parent;
      log(down.keyCode);
      switch (down.keyCode) {
        case 9:
          return utils.tab(input, down);
        case 32:
          down.returnValue = false;
          parent = curr_tag.parentNode;
          new_tag = tag_code();
          next = new_tag.nextElementSibling;
          if (next != null) {
            parent.insertBefore(new_tag, next);
          } else {
            parent.appendChild(new_tag);
          }
          return jump(new_tag);
      }
    };
  };
  return exports;
});
