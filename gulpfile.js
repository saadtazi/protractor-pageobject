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

gulp.task('test', function() {
  gulp.src(['./tests/specs/**/*.spec.js'])
    .pipe(protractor({
      configFile: './protractor.config.js'
    }))
    .on('error', function(e) {
      throw e;
    });
});



gulp.task('webdriver_standalone', webdriver_standalone);