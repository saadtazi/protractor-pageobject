/* global protractor */
'use strict';

var Component = require('../../../../lib').Component;

var SearchBox = Component.extend({
  set: function(val) {
    this.el.sendKeys(val);
    return this.el.sendKeys(protractor.Key.ENTER);
  },
  getSearchQuery: function() {
    return this.el.getAttribute('value');
  }
});

module.exports = SearchBox;
