var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var protractor = $.protractor.protractor;
var webdriver_standalone = $.protractor.webdriver_standalone;


gulp.task('lint', function() {
  return gulp.src(['./lib/*.js', './tests/*.js'])
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


gulp.task('webdriver_standalone', webdriver_standalone);