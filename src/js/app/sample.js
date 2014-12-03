'use strict';

var Obj = (function() {
    return function() {
        var docRoot = '/somewhere';

        this.validateDocRoot = function(value) {

        };

        /*
            Set Doc root
         */
        this.setDocRoot = function(val) {
          this.validateDocRoot(val);
          docRoot = val;
        };

        /*
            get Doc root.
         */
        this.getDocRoot = function() {
          return docRoot;
        };

    }
} ());


module.exports.sample = (function() {
    return function() {
        var docRoot = '/somewhere';

        this.validateDocRoot = function(val) {
            if(typeof val === 'undefined') throw 'Value required';
            //Validation logic - throw Exception of not ok
            console.log('This is good');
        };

        this.setDocRoot = function(val) {
            this.validateDocRoot(val);
            docRoot = val;
        };

        this.getDocRoot = function() {
            return docRoot;
        };

        this.test = function() {
            return 'This is working';
        };

        Object.preventExtensions(this);
    }
} ());
