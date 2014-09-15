'use strict';

/**
 * Expose `plugin`.
 */

module.exports = each;

function each(func) {
  return function(files, metalsmith, done){
    setImmediate(done);

    Object.keys(files).forEach(function(filename){
      var file = files[filename];
      func(file, filename);
    });
  };
}
