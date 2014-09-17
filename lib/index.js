'use strict';

module.exports = each;

function each(func) {
  return function(files, metalsmith, done){
    var filenames = Object.keys(files);

    // call metalsmith's done() function after alldone() has been called
    // filenames.length times
    var alldone = (function alldone(){
      var count = 0;

      return function () {
        if (++count >= filenames.length) {
          done();
        }
      };
    })();

    filenames.forEach(function(filename){
      var file = files[filename];
      if (func.length > 2) {
        func(file, filename, alldone);
      } else {
        func(file, filename);
        alldone();
      }
    });
  };
}
