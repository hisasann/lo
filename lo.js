// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // commonjs
    module.exports = factory();
  } else {
    // Browser globals
    root.lo = factory();
  }
})(this, function () {
  var lo = {};

  // スタック情報拡張
  // via http://stackoverflow.com/questions/11386492/accessing-line-number-in-v8-javascript-chrome-node-js
  Object.defineProperty(lo, '__stack', {
    get: function() {
      var orig = Error.prepareStackTrace;
      Error.prepareStackTrace = function(err, stack) {
        /* coffee-scriptのpatchStackTrace()で拡張されたエラーメッセージをセットしたスタックを返す*/

        var messages;
        var exErrStack = typeof orig === "function" ? orig(err, stack) : void 0;
        if (exErrStack != null) {
          messages = exErrStack.split(/[\r\n]\s*/);
          /* 1行目は'Error:'だけなのでいらない*/

          messages.shift();
        } else {
          messages = [];
        }
        /* スタックに拡張エラー情報をセットしていく*/

        for (var i = 0, len = stack.length; i < len; i++) {
          var s = stack[i];
          Object.defineProperties(s, {
            messageEx: {
              value: messages[i],
              writable: false,
              enumerable: false,
              configurable: false
            },
            func: {
              get: function() {
                var _ref;
                return (_ref = this.getFunctionName()) != null ? _ref : '<anonymous>';
              }
            },
            file: {
              get: function() {
                return this.getFileName().match(/([^\\\/]*)$/)[1];
              }
            },
            line: {
              get: function() {
                /* 拡張エラー情報がなければオリジナルのgetLineNumber()の結果を返す*/

                if (!this.messageEx) {
                  return this.getLineNumber();
                }
                /**
                 * 以下のようなcoffee-script拡張エラー情報から行番号の部分を抜き出す
                 * ex) 'at test (/path/to/test.coffee:7:1, <js>:15:3)'
                 */

                return (this.messageEx.match(/[^\\\/:]+:(\d+):\d+/ != null ? /[^\\\/:]+:(\d+):\d+/ : []))[1];
              }
            }
          });
        }
        return stack;
      };
      var e = new Error();
      Error.captureStackTrace(e, arguments.callee);
      var stack = e.stack;
      Error.prepareStackTrace = orig;
      return stack;
    }
  });

  var zeroPadding = function(d) {
    return ('0' + d).substr(-2);
  };

  var logFormatter = function(timestamp, level, func, file, line) {
    return [func, '@', file, ':', line, ' [', level, '] '].join('');
  };

  var logger = function(level, msg) {
    var d = new Date();
    var timestamp = [d.getFullYear(), '-', zeroPadding(d.getMonth() + 1), '-', zeroPadding(d.getDate()), ' ', zeroPadding(d.getHours()), ':', zeroPadding(d.getMinutes()), ':', zeroPadding(d.getSeconds())].join('');
    var stack = lo.__stack[2];
    var prefix = [logFormatter(timestamp, level, stack.func, stack.file, stack.line)];
    var output = prefix.concat(msg);

    return output;
  };

  // is show console.xxx
  lo.isConsoleLog = true;

  var logType = [
    {key: 'l', value: 'log'},
    {key: 'i', value: 'info'},
    {key: 'w', value: 'warn'},
    {key: 'e', value: 'error'}
  ];

  logType.forEach(function(type) {
    lo[type.key] = function() {
      if (!lo.isConsoleLog) {
        return;
      }
      console[type.value].apply(console, logger(type.value, Array.prototype.slice.call(arguments)));
    }
  });

  return lo; // point
});

