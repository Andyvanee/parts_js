/*!
 *  Parts_js - Core Library
 *  Copyright 2011, Andy Vanee
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://andyvanee.com/
 */
 
(function() {
  var parts = function(arg) {
    if (typeof arg == "string") return parts.select(arg);
    else return parts.value(arg);
  };
  parts.mixin = function(name, fn, args) {
    this[name] = function(args) {var r = fn(this, args); if(r) return r; return this;}
  };
  parts.select = function(selector) {
    this.queryString = selector;
    this.value = document.getElementById(selector);
    return this;
  };
  
  parts.value = function(value) {
    this.value = value;
    return this;
  }
  return (window.parts = window.p = parts);
})();


parts.mixin("select",
  function(obj, selector) {
    obj.queryString = selector;
    obj.value = sel(selector);
  }
);

// p().each(function() {}) => p()
parts.mixin(
  "each", function(obj, fn) {
    for (i in obj.value){ 
      fn(obj.value[i]);
    }
  }
);

parts.mixin(
  "html", 
  function(obj, arg){
    if (arg == undefined) return obj.value[0].innerHTML;
    if (typeof arg == "function") { obj.value[0].innerHTML = arg(obj.value[0].innerHTML) };
    if (typeof arg == "string") { obj.value[0].innerHTML = arg; }
  }
);

/* Sel Selector engine */
(function(){
  var sel = function( selector, context ){
    var args = selector.split(" "),
    arg = args.shift(), value = [], f, result, cond;
    
    var f = function(elem, arg){
      return (arg[0] == "#") ? [elem.getElementById(arg.slice(1))] : 
      (arg[0] == ".") ? elem.getElementsByClassName(arg.slice(1)) :
      elem.getElementsByTagName(arg);
    }
    
    if (context) {
      for (i in context){
        result = f(context[i], arg);
        for (i in result) {if (result[i] && result[i].parentNode) value.push(result[i])};
      }
    }
    else {
      result = f(document, arg);
      for (i in result) {if (result[i] && result[i].parentNode) value.push(result[i])};
    }
    

    if (args.length < 1) return value;
    else return sel(args.join(" "), value);
  };
  window.sel = sel;
})();