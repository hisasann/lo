'use strict'

gulp = require 'gulp'
$ = require('gulp-load-plugins')()

fs = require 'fs'
browserify = require 'browserify'
watchify = require 'watchify'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
colors = require 'colors'
runSequence = require 'run-sequence'

connect = require 'connect'

# リリースの場合 gulp watch --release
isRelease = $.util.env.release

# 新しくプロジェクトつくる場合はここに追加
# JavaScript Task
javascriptFiles = [
  {
    input      : ['./test/test.coffee']
    output     : 'test.js'
    extensions : ['.coffee']
    destination: './test/'
  }
]

createBundle = (options) ->
  bundler = browserify(
    entries: options.input
    extensions: options.extensions
    cache: {}
    packageCache: {}
    fullPaths: false
    debug: false
  )
  bundler = watchify(bundler) if global.isWatching
  bundler
  .on("log", $.util.log)

  rebundle = ->
    startTime = new Date().getTime()
    bundler.bundle()
    .on 'error', ->
      console.log arguments
    .pipe(source(options.output))
    .pipe buffer()
    .pipe $.if isRelease, $.uglify({preserveComments: 'some'})    # リリース時は圧縮する
    .pipe $.size(gulp) # jsのファイルサイズ
    .pipe gulp.dest(options.destination)
    .on 'end', ->
      time = (new Date().getTime() - startTime) / 1000
      console.log "#{options.output.cyan} was browserified: #{(time + 's').magenta}"

  if global.isWatching
    bundler.on 'update', rebundle

  rebundle()

createBundles = (bundles) ->
  bundles.forEach (bundle) ->
    createBundle
      input      : bundle.input
      output     : bundle.output
      extensions : bundle.extensions
      destination: bundle.destination

gulp.task 'browserify', ->
  createBundles javascriptFiles


gulp.task 'build', ->
  gulp.src './src/lo.coffee'
    .pipe $.plumber()   # エラーが置きても中断させない
    .pipe $.coffeelint
      max_line_length:
        value: 120
    .pipe $.coffeelint.reporter()
    .pipe $.coffee({bare: false}).on 'error', (err) ->
      console.log err
    .pipe $.if isRelease, $.uglify()    # リリース時は圧縮する
    .pipe gulp.dest 'build/'
    .pipe $.size() # jsのファイルサイズ


# Server
port = 4567
gulp.task 'connect', ->
  app = connect()
  .use(require('connect-livereload')({port: 35729}))
  .use(connect.static('test'))
  .use(connect.directory('test'));

  http = require 'http'
  http.createServer(app)
  .listen(4567)
  .on 'listening', ->
    console.log 'Start Server on http://localhost:', port

  require('opn')('http://localhost:' + port)

gulp.task 'global-watch',->
  global.isWatching = true

# 基本的にはこのタスクを実行することになる
gulp.task 'watch', ['global-watch', 'browserify', 'connect'], ->
  server = $.livereload()
  # listen livereload server
  $.livereload.listen()

  gulp.watch([
    'test/**/*.html'
    'test/**/*.js'
  ]).on 'change', (file)->
    console.log 'watch: ', file.path
    server.changed file.path
