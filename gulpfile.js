'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var protractor = $.protractor.protractor;

/* jshint camelcase: false */
var webdriverStandalone = $.protractor.webdriver_standalone;
/* jshint camelcase: true */

gulp.task('lint', function() {
  return gulp.src(['gulpfile.js', './lib/*.js', './tests/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('protractor', function() {
  gulp.src(['./tests/integration/specs/**/*.spec.js'])
    .pipe(protractor({
      configFile: './protractor.config.js'
    }))
    .on('error', function(e) {
      throw e;
    });
});


var spawn = require('child_process').spawn;

gulp.task('kk', function(cb) {
  console.log('cici');
  spawn('node_modules/.bin/protractor', ['protractor.config.js'], {
    stdio: 'inherit'
  }).once('close', cb);
});



gulp.task('integration', function(cb) {
  var server = require('./tests/test-server/app');
  spawn('node_modules/.bin/protractor', ['protractor.config.js'], {
    stdio: 'inherit'
  }).once('close', function(exitCode) {
    server.close();
    cb(exitCode);
  });

});

gulp.task('unit', function() {
  return gulp.src(['tests/unit/**/*.js'], {
    read: false
  })
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe($.mocha({
      reporter: 'nyan'
    }));
});

gulp.task('watch', function() {
  gulp.watch(['tests/unit/**/*', 'lib/**/*'], ['lint', 'unit']);
});


gulp.task('webdriver_standalone', webdriverStandalone);