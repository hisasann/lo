(function() {
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

}).call(this);
