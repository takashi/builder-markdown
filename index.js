var fs = require('fs');
var marked = require('marked');
var crypto = require('crypto');
var str2js = require('string-to-js');

var cache = Object.create(null);

exports = module.exports = function (options) {
  options = options || {};

  var opts = {
    renderer: new marked.Renderer(),
    gfm: options.gfm || true,
    tables: options.tables || true,
    breaks: options.breaks || false,
    pedantic: options.pedantic || false,
    sanitize: options.sanitize || true,
    smartLists: options.smartLists || true,
    smartypants: options.smartypants || false
  }

  marked.setOptions(opts);

  return function markdown(file, done) {
    if (!~exports.extensions.indexOf(file.extension)) return done();
    file.read(function (err, string) {
      if (err) return done(err);

      // don't cache between environments
      var dev = this.dev ? '1' : '0';
      var compile = options.string ? '1' : '0';
      var hash = dev + compile + calculate(string);

      var res
      try {
        res = cache[hash] = cache[hash] || marked(string);
        res = str2js(res);
      } catch (err) {
        done(err);
        return;
      }

      file.extension = 'js';

      file.string = 'module.exports = ' + res;

      done();
    })
  }
}

exports.extensions = [
  'md',
  'mkdn',
  'mdown',
  'markdown'
];

function calculate(string) {
  return crypto.createHash('sha256').update(string).digest('hex');
}
