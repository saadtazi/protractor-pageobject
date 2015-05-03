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

gulp.task('e2e', function() {
  gulp.src(['./tests/specs/e2e/**/*.spec.js'])
    .pipe(protractor({
      configFile: './protractor.config.js'
    }))
    .on('error', function(e) {
      throw e;
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