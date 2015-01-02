'use strict';
// Load Plugins
var pkg          = require('./package.json'),
    gulp         = require('gulp'),
    jshint       = require('gulp-jshint'),
    header       = require('gulp-header');

// Used for copyright headers
var banner = '/*! <%= pkg.title %> <%= pkg.version %> | <%= pkg.homepage %> | (c) 2014 BoomTown | MIT License */\n';

// JS Hint
gulp.task('jshint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint({
      'boss': true,
      'sub': true,
      'evil': true,
      'browser': true,
      'multistr': true,
      'globals': {
        'module': false,
        'require': true
      }
    }))
    .pipe(jshint.reporter('jshint-stylish'));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(header(banner, { pkg : pkg }))
    .pipe(gulp.dest('dist/js/'));
});

// Default task
gulp.task('default', ['jshint', 'scripts']);
