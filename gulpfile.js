'use strict';

var gulp = require('gulp'),
    assemble = require('gulp-assemble'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    htmlTidy = require('gulp-htmltidy'),
    browserSync = require('browser-sync'),
    mocha = require('gulp-mocha'),
    browserify = require('gulp-browserify'),
    config = require('./config');




gulp.task('default', function() {});


/**
 * css
 * */

gulp.task('css', ['css:sass']);

gulp.task('css:sass', function() {
    return gulp.src(config.sass.src)
        .pipe(sass())
        .pipe(gulp.dest(config.sass.dest));
});

/**
 * Remove
 */
gulp.task('remove', ['remove:clean']);

gulp.task('remove:clean', function() {
   return gulp.src(config.clean.dest, {read: false})
       .pipe(clean());
});



/**
 * HTML
 */
gulp.task('html', ['html:assemble']);

gulp.task('html:assemble', function() {
    return gulp.src(config.assemble.paths.src)
        .pipe(assemble(config.assemble.properties))
        .pipe(htmlTidy({
            indent: true
        }))
        .pipe(gulp.dest(config.assemble.paths.dest));
});



gulp.task('js', ['js:browserify']);
gulp.task('test', ['js:test']);

gulp.task('js:test', function() {
    return gulp.src(config.mocha.paths.src)
        .pipe(mocha());
});

gulp.task('js:browserify', function() {
    return gulp.src(config.browserify.paths.src)
        .pipe(browserify(config.browserify.options))
        .pipe(gulp.dest(config.browserify.paths.dest));
});


gulp.task('browser-sync', function() {
    browserSync({
      server: {
          baseDir: './build/'
      }
  });
});


gulp.task('default', ['browser-sync'], function() {
    gulp.watch('./src/scss/**/*.scss', [ 'css', browserSync.reload]);
    gulp.watch('./src/templates/**/*.hbs', ['html', browserSync.reload]);
    gulp.watch('./src/js/app/**/*.js', ['js', browserSync.reload]);

    //No need to reload page
    gulp.watch('./src/js/tests/**/*.js', ['test']);
});

gulp.task('build', [ 'css', 'html']);