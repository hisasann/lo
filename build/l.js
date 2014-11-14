(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var l;

if (!console.log) {
  throw new Error("l requires console.log");
}

l = {
  isConsoleLog: true
};

Object.defineProperty(l, "__stack", {
  get: function() {
    var err, orig, stack;
    orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack) {
      return stack;
    };
    err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(l, "__line", {
  get: function() {
    return l.__stack[1].getLineNumber();
  }
});

Object.defineProperty(l, "__file", {
  get: function() {
    return l.__stack[0].getFileName();
  }
});

l.l = function(log) {
  if (l.isConsoleLog) {
    return console.log([l.__line, ' - ', log].join(''));
  }
};

module.exports = l;


},{}]},{},[1]);
