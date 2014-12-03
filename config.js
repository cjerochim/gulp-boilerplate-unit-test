'use strict';

/**
 *
 * Configuration file for gulp
 *
 **/


module.exports.assemble = {
    paths: {
        src: './src/templates/pages/**/*.hbs',
        dest: './build/'
    },
    properties: {
            data: 'src/data/*.json',
            partials: 'src/templates/partials/**/*.hbs',
            layoutdir: 'src/templates/layouts/',
            helpers: 'src/helpers/**/*.js'
    }
};


module.exports.mocha = {
    paths: {
        src: './src/js/tests/**/*.js'
    },
    options: {}
};

module.exports.browserify = {
  paths: {
      src: './src/js/app/main.js',
      dest: './build/js'
  },
   options: {
       insertGlobals : true,
       debug: true
   }
};

module.exports.clean = {
  dest: './build/'
};




module.exports.sass = {
    src: './src/scss/**/*.scss',
    dest: './build/css'
};