lo = require '../src/lo'
lo.l 'test', 2, {a: 'b'}, [1, 'a'], false, () ->
  return 1

obj =
  hoge: 1
  foo: 2
lo.l obj

lo.l 1
lo.l 2
lo.l 3

lo.isConsoleLog = false
lo.l 'don\'t display'

