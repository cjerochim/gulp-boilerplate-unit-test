'use strict';

var gulp = require('gulp'),
    assemble = require('gulp-assemble'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    htmlTidy = require('gulp-htmltidy'),
    browserSync = require('browser-sync'),
    mocha = require('gulp-mocha'),
    browserify = require('gulp-browserify'),
    notify = require('gulp-notify'),
    config = require('./config');


/**
 * css
 * */
gulp.task('css', ['css:sass']);


gulp.task('css:sass', function() {
    return gulp.src(config.sass.src)
        .pipe(sass())
        .pipe(gulp.dest(config.sass.dest))
        .pipe(notify({
            message: 'CSS Complete'
        }));
});


/**
 * Remove Entire build
 */
gulp.task('remove', function() {
   return gulp.src(config.clean.dest, {read: false})
       .pipe(clean())
       .pipe(notify({
           message: 'Remove Complete'
       }));
});



/**
 * HTML / Generate html and ensure it's pretty
 */
gulp.task('html', ['html:assemble']);

gulp.task('html:assemble', function() {
   return gulp.src(config.assemble.paths.src)
        .pipe(assemble(config.assemble.properties))
        .pipe(htmlTidy({
            indent: true
        }))
        .pipe(gulp.dest(config.assemble.paths.dest))
       .pipe(notify({
           message: 'Assemble Complete'
       }));
});




/****************
 * JS
 *****************/
gulp.task('js', ['js:browserify']);
gulp.task('test', ['js:test']);

/**
 * Unit Testing JS files
 */
gulp.task('js:test', function() {
    return gulp.src(config.mocha.paths.src)
        .pipe(mocha());
});


/**
 * Bundle JS files into modules
 */
gulp.task('js:browserify', function() {
    return gulp.src(config.browserify.paths.src)
        .pipe(browserify(config.browserify.options))
        .pipe(gulp.dest(config.browserify.paths.dest));
});

/**
 *  Local hosting / reload of page
 **/
gulp.task('browser-sync', function() {
    browserSync({
      server: {
          baseDir: './build/'
      }
  });
});


/**
 *  Watch files and update browser if required.
 **/
gulp.task('default', ['browser-sync', 'test', 'build'], function() {
    gulp.watch('./src/scss/**/*.scss', [ 'css', browserSync.reload]);
    gulp.watch('./src/templates/**/*.hbs', ['html', browserSync.reload]);
    gulp.watch('./src/js/app/**/*.js', ['js', browserSync.reload]);

    //No need to reload page for unit tests
    gulp.watch('./src/js/tests/**/*.js', ['test']);
});


gulp.task('build', [ 'css', 'js']);