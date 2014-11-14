# http://d.hatena.ne.jp/y-kawaz/20110415/1302846675
# http://stackoverflow.com/questions/11386492/accessing-line-number-in-v8-javascript-chrome-node-js

if !console.log
  throw new Error( "l requires console.log" );

l =
  isConsoleLog: true

Object.defineProperty l, "__stack",
  get: ->
    orig = Error.prepareStackTrace
    Error.prepareStackTrace = (_, stack) ->
      stack

    err = new Error
    Error.captureStackTrace err, arguments.callee
    stack = err.stack
    Error.prepareStackTrace = orig
    stack

Object.defineProperty l, "__line",
  get: ->
    l.__stack[1].getLineNumber()

Object.defineProperty l, "__file",
  get: ->
    l.__stack[0].getFileName()

l.l = (log) ->
  if l.isConsoleLog
    console.log [l.__line, ' - ', log].join ''

module.exports = l
