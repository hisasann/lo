(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var lo, obj;

lo = require('../src/lo');

lo.l('test', 2, {
  a: 'b'
}, [1, 'a'], false, function() {
  return 1;
});

obj = {
  hoge: 1,
  foo: 2
};

lo.l(obj);

lo.l(1);

lo.l(2);

lo.l(3);

lo.isConsoleLog = false;

lo.l('don\'t display');


},{"../src/lo":2}],2:[function(require,module,exports){
var lo;

lo = {
  isConsoleLog: true
};

lo.l = function() {
  var logs;
  if (lo.isConsoleLog) {
    logs = Array.prototype.slice.call(arguments);
    return console.log.apply(console, logs);
  }
};

module.exports = lo;


},{}]},{},[1]);
