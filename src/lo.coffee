# http://d.hatena.ne.jp/y-kawaz/20110415/1302846675
# http://stackoverflow.com/questions/11386492/accessing-line-number-in-v8-javascript-chrome-node-js

if !console.log
  throw new Error( "l requires console.log" );

lo =
  isConsoleLog: true

Object.defineProperty lo, "__stack",
  get: ->
    orig = Error.prepareStackTrace
    Error.prepareStackTrace = (_, stack) ->
      stack

    err = new Error
    Error.captureStackTrace err, arguments.callee
    stack = err.stack
    Error.prepareStackTrace = orig
    stack

Object.defineProperty lo, "__line",
  get: ->
    lo.__stack[1].getLineNumber()

Object.defineProperty lo, "__file",
  get: ->
    lo.__stack[0].getFileName()

lo.l = (log) ->
  if l.isConsoleLog
    console.log [lo.__line, ' - ', log].join ''

module.exports = lo
