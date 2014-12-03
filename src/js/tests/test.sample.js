'use strict';

var should = require('should'),
    Obj = require('../app/sample').sample;

describe('validate docRoot', function() {
    var config = new Obj();

    it('throw if docRoot does not exist', function(done) {
        should.exist(config);
        done();
    });

    it('Should throw an error by not defining a docRoot', function(done) {
        config.test().should.equal('This is working');
        done();
    })
});