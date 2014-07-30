var vm = require('vm')
var co = require('co')
var mkdirp = require('mkdirp')
var assert = require('assert')
var resolve = require('component-resolver')
var Builder = require('component-builder')
var join = require('path').join

var options = {
  install: true
}

var output = '<h1 id="hello-world">Hello world</h1>\\n'

function fixture(name) {
  return join(__dirname, 'fixtures', name)
}

function build(nodes, options) {
  return new Builder.scripts(nodes, options)
    .use('scripts', Builder.plugins.js())
    .use('markdown', require('..')(options))
}

describe('markdown', function () {
  var tree
  var js = Builder.scripts.require

  it('should install', co(function* () {
    tree = yield* resolve(fixture('markdown'), options)
  }))

  it('should build', co(function* () {
    js += yield build(tree).end();
  }))

  it('should execute', function () {
    var ctx = vm.createContext()
    vm.runInContext(js, ctx)
    vm.runInContext("if(require('markdown') !== '"
      + output + "') throw new Error()", ctx);
  })
})

describe('local', function () {
  var tree
  var js = Builder.scripts.require

  it('should install', co(function* () {
    tree = yield* resolve(fixture('local'), options)
  }))

  it('should build', co(function* () {
    js += yield build(tree).end();
  }))

  it('should execute', function () {
    var ctx = vm.createContext()
    vm.runInContext(js, ctx)
    vm.runInContext("if (require('./lib/home') !== '"
      + output + "') throw new Error()", ctx);
  })
})
