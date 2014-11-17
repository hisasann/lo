lo =
  isConsoleLog: true

lo.l = () ->
  if lo.isConsoleLog
    logs = Array.prototype.slice.call arguments

    # http://stackoverflow.com/questions/18746440/passing-multiple-arguments-to-console-log
    console.log.apply console, logs

module.exports = lo
