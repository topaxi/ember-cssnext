var CssnextCompiler = require('broccoli-cssnext-single')
var path            = require('path')
var merge           = require('lodash.merge')
var mergeTrees      = require('broccoli-merge-trees')
var checker         = require('ember-cli-version-checker')

function CssnextPlugin(options) {
  this.name    = 'ember-cssnext'
  this.ext     = 'css'
  this.options = options
}

CssnextPlugin.prototype.toTree = function(tree, inputPath, outputPath, inputOptions) {
  var options = merge({}, this.options(), inputOptions)

  var ext   = this.ext
  var paths = options.outputPaths || {
    app: options.registry.app.options.outputPaths.app.css
  }

  var trees = Object.keys(paths).map(function(file) {
    var input  = path.join(inputPath, file + '.' + ext)
    var output = paths[file]

    return new CssnextCompiler([tree], input, output, options)
  })

  return mergeTrees(trees)
}

module.exports = {
  name: 'Ember cssnext',
  project: this.project,

  shouldSetupRegistryInIncluded: function() {
    return !checker.isAbove(this, '0.2.0')
  },

  cssnextOptions: function() {
    var env     = process.env.EMBER_ENV
    var app     = this.app
    var options = app && app.options && app.options.cssnextOptions || {}

    if (options.sourceMap === undefined && env === 'development') {
      options.sourceMap = true
    }

    return options
  },

  setupPreprocessorRegistry: function(type, registry) {
    registry.add('css', new CssnextPlugin(this.cssnextOptions.bind(this)))

    if (registry.remove) {
      registry.remove('css', 'broccoli-cssnext-single')
    }
  },

  included: function(app) {
    this.app = app // used to provide back-compat for ember-cli < 0.2.0 in cssnextOptions()
    this._super.included.apply(this, arguments)

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry)
    }
  },

  buildError: function(error) {
    if (error) {
      error.stack = error.stack || JSON.stringify(error, null, 2)
    }
  }
}
