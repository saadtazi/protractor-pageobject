'use strict';

var Base = require('./base');

module.exports = {
  Base: Base,
  Page: require('./page'),
  Component: require('./component'),
  ItemList: require('./item-list'),
  inject: function(browser) {
    Base.browser = browser;
  }
};