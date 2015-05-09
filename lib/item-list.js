'use strict';

var _ = require('lodash');
var Page = require('./page');

var ItemList = module.exports = Page.extend({
  constructor: function(opts) {
    ItemList.__super__.constructor.call(this, opts);

    if ((!opts || !opts.itemsEl) && !this.itemsEl) {
      throw new Error('You should provide an `itemsEl` property');
    }
    if ((!opts || !opts.itemClass) && !this.itemClass) {
      throw new Error('You should provide an `itemClass` property');
    }
    this.itemClass = this.itemClass || opts.itemClass;
    this.itemsKey = this.itemsEl || opts.itemsEl;

    if (!this.els[this.itemsKey]) {
      throw new Error('You should provide a selector for `itemsEl` (in `els`)');
    }

  },

  items: function() {
    return this.elements(itemsKey).map(function(element) {
      return new itemClass(element);
    });
  }
});