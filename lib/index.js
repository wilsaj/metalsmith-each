'use strict';

module.exports = each;

function each(func) {
  return function(files, metalsmith, done){
    var filenames = Object.keys(files);

    if (filenames.length === 0) {
      done();
    } else {
      // call metalsmith's done() function after alldone() has been called
      // filenames.length times
      var alldone = (function (){
        var count = 0;

        return function alldone(response) {
          if (++count >= filenames.length) {
            done();
          }
        };
      })();

      filenames.forEach(function(filename){
        var response;
        var file = files[filename];

        function rename(response) {
          if (response && response !== filename) {
            files[response] = file;
            delete files[filename];
          }
        }

        if (func.length > 2) {
          func(file, filename, function (response) {
            rename(response);
            alldone();
          });
        } else {
          response = func(file, filename);
          rename(response);
          alldone();
        }
      });
    }
  };

}
