'use strict';

var Base = require('./base');

var Component = module.exports = Base.extend({
  constructor: function(opts) {

    if (!opts.el) {
      throw new Error('You should provide an element object');
    }
    this.dv = opts.el;
    Component.__super__.constructor.call(this, opts);
  }
});