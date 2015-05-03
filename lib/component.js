'use strict';

var Base = require('./base');

module.exports = Base.extend({
  constructor: function(opts) {
    if (!opts.el) {
      throw new Error('You should provide an element object');
    }
    this.dv = opts.el;
    this.__super__.constructor.call(this, arguments);
  }
});