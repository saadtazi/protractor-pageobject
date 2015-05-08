'use strict';

var gulp = require('gulp');
var spawn = require('child_process').spawn;

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('lint', function() {
  return gulp.src(['gulpfile.js', './lib/*.js', './tests/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
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

function wdManagerTask(type) {
  return function(cb) {
    spawn('node_modules/.bin/webdriver-manager', [type], {
      stdio: 'inherit'
    }).once('close', function(exitCode) {
      cb(exitCode);
    });
  };
}

gulp.task('webdriver-manager-update', wdManagerTask('update'));
gulp.task('webdriver-manager-start', wdManagerTask('start'));