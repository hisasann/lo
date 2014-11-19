(function() {
  (function(global) {
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
    if (typeof define === "function" && define.amd) {
      define(function() {
        return lo;
      });
    } else if (typeof exports === "object") {
      module.exports = lo;
    } else {
      global.lo = lo;
    }
  })(this);

}).call(this);
