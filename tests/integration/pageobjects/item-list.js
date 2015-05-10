'use strict';

var ItemList = require('../../../lib/item-list');

var List = ItemList.extend({
  url: 'http://127.0.0.1:3000/list',
  els: {
    'item': by.css('.item')
  },
  itemClass: require('./item'),
  itemsEl: 'item'
});

module.exports = List;
