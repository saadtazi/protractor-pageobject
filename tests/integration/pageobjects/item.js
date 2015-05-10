'use strict';

var Component = require('../../../lib').Component;

var Item = Component.extend({
  els: {
    'title': by.css('.item-title'),
    'description': by.css('.item-description')
  }
});

module.exports = Item;
