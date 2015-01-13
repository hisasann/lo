
((global) ->
  lo =
    isConsoleLog: true

  lo.l = () ->
    if lo.isConsoleLog
      logs = Array.prototype.slice.call arguments

      # http://stackoverflow.com/questions/18746440/passing-multiple-arguments-to-console-log
      console.log.apply console, logs

  lo.e = () ->
    if lo.isConsoleLog
      logs = Array.prototype.slice.call arguments

      # http://stackoverflow.com/questions/18746440/passing-multiple-arguments-to-console-log
      console.error.apply console, logs

  if typeof define is "function" and define.amd
    define ->
      lo
  else if typeof exports is "object"
    module.exports = lo
  else
    global.lo = lo
  return
) this