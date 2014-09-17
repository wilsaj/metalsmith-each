'use strict';

var assert = require('assert');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var rimraf = require('rimraf');

var each = require('..');


describe('metalsmith-each', function(){
  before(function(done){
    rimraf('test/build', function () {
      done();
    });
  });

  after(function(done){
    rimraf('test/build', function () {
      done();
    });
  });

  it('works with basic assignment', function(done) {
    var testCount = 0;
    var expected = {
      'index.md': 'INDEX.MD',
      'nested/index.md': 'NESTED/INDEX.MD'
    };

    Metalsmith('test/fixtures/basic')
      .destination('../../build/basic')
      .use(each(function (file, filename) {
        file.uppered = filename.toUpperCase();
      }))
      .use(function(files, metalsmith, done){
        Object.keys(files).forEach(function(filename){
          var file = files[filename];
          var expectedName = expected[filename];
          assert.equal(file.uppered, expectedName);
          testCount++;
        });
        done();
      })
      .build(function(err){
        if (err) {return done(err);}
        assert.equal(testCount, Object.keys(expected).length);
        equal('test/fixtures/basic/expected', 'test/build/basic');
        done();
      });
  });

  it('works with timeouts', function(done) {
    var testCount = 0;
    var expected = {
      'index.md': 'INDEX.MD',
      'nested/index.md': 'NESTED/INDEX.MD'
    };

    Metalsmith('test/fixtures/basic-timeout')
      .destination('../../build/basic-timeout')
      .use(each(function (file, filename, done) {
        setTimeout(function () {
          file.uppered = filename.toUpperCase();
          done();
        }, 20);
      }))
      .use(function(files, metalsmith, done){
        Object.keys(files).forEach(function(filename){
          var file = files[filename];
          var expectedName = expected[filename];
          assert.equal(file.uppered, expectedName);
          testCount++;
        });
        done();
      })
      .build(function(err){
        if (err) {return done(err);}
        assert.equal(testCount, Object.keys(expected).length);
        equal('test/fixtures/basic-timeout/expected', 'test/build/basic-timeout');
        done();
      });
  });
});
