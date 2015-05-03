'use strict';

var Base = require('./base');

module.exports = {
  Page: require('./page'),
  component: require('./component'),
  itemList: require('./item-list'),
  inject: function(browser) {
    Base.browser = browser;
  }
};