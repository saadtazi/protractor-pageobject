'use strict';

var Base = require('./base');

var Component = module.exports = Base.extend({
  constructor: function(opts) {
    if ((!opts || !opts.el) && !this.el) {
      throw new Error('You should provide a property `el`');
    }
    this.dv = this.el || opts.el;
    this.el = this.dv;
    Component.__super__.constructor.call(this, opts);
  }
});