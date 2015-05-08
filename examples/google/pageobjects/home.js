'use strict';

// it should be `require('protractor-pageobject').Page;
var Page = require('../../../lib').Page;

var Home = Page.extend({
  url: 'http://www.google.com/',
  els: {
    searchBox: by.name('q'),
    resultContainer: by.id('ires')
  },
  comps: {
    searchBox: {
      model: require('./search-box')
    },
    resultContainer: {
      model: require('./results')
    }
  },

  search: function(query) {
    // overkill example of a component...
    // A component should not be used for only one basic field...
    this.waitForElement('searchBox', 2000);
    var searchBox = this.component('searchBox');
    searchBox.set(query);
    return this.waitForResults();
  },

  waitForResults: function() {
    return this.waitForElement('resultContainer', 2000);
  }

});

module.exports = Home;
