:lipstick: lo :lipstick:
===============

<img src="http://npm.packagequality.com/badge/lo.png"/>

lo is a module of only was to simplify the console.log

## usage

```javascript
lo = require('lo')

lo.l('message')
```

### isConsoleLog param

true to output, false does not output

```javascript
lo = require('lo')

lo.isConsoleLog = false

lo.l('message')  // not output
```

## console methods correspondence table

|console methdo|lo method|
|:--|:--|
|console.log|lo.l||
|console.info|lo.i||
|console.warn|lo.w||
|console.error|lo.e||

### thanks

[ktty1220/lwl](https://github.com/ktty1220/lwl)

enjoy!!
