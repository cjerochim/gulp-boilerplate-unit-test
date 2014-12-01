'use strict';

var gulp = require('gulp'),
    assemble = require('gulp-assemble'),
    sass = require('gulp-sass'),
    config = require('./config');




gulp.task('default', function() {
});


gulp.task('css', ['css:sass']);


gulp.task('css:sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(config.sass.dest));
});



