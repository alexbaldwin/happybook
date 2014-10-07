
var fs = require('fs');
var cheerio = require('cheerio');
var through = require('through2');
var util = require('gulp-util');

module.exports = function(options) {

  var options = options || {};

  return through.obj(function(file, enc, callback) {

    if (!file.isBuffer()) callback();

    var $ = cheerio.load(file.contents.toString());
    var $includes = $('[data-include]');

    if (!$includes) callback();

    $includes.each(function(i) {
      var path = $(this).data('include');
      util.log('Including: ' + path);
      if (!path) return;
      var partial = fs.readFileSync(path, 'utf8');
      $(this).replaceWith(partial);
    });

    file.contents = new Buffer($.html());
    this.push(file);
    callback();

  });

};
