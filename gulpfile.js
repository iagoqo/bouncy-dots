/*jslint node: true*/
'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var del = require('del');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var debug = require('gulp-debug');
var karma = require('karma');

/// Config
var dist = './dist/';
var src = './src/';

/// Tasks
// Concats, minifies and moves CSS files to distribution folder
gulp.task('css', function() {
  return gulp.src(src + '**/*.css')
    .pipe(concat('styles.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(dist));
});

// Concats, minifies and moves JS files to distribution folder
gulp.task('js', function() {
  return gulp.src(src + '**/*.js')
  .pipe(concat('scripts.min.js'))
  .pipe(stripDebug())
  .pipe(uglify())
  .pipe(gulp.dest(dist));
});

// Injects CSS and JS files into HTML files, minifies them and moves them to the distribution folder
gulp.task('html', ['css', 'js'], function() {
  return gulp.src(src + '**/*.html')
    .pipe(gulp.dest(dist))
    .pipe(inject(gulp.src([dist+'**/*.js',dist+'**/*.css'],{read:false}),{relative:true}))
    .pipe(htmlmin({
      collapseWhitespace: true,
      preserveLineBreaks: true,
      conservativeCollapse: true,
      removeComments: true
    }))
    .pipe(gulp.dest(dist));
});

// Removes everything from the distribution folder
gulp.task('clean', function() {
  del(dist + '*');
});

// Builds the project, ready for distribution
gulp.task('build', ['html']);

// Runs tests
gulp.task('test', function (done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// Cleans de distribution folder and builds the project
gulp.task('default', function() {
  runSequence('clean', 'build');
});
