'use strict';

var Page = require('../../../lib/page');

var Home = Page.extend({
  url: 'http://saadtazi.com/',
  els: {
    topSection: by.css('.jumbo-container'),
    panels: by.css('.panel')
  }
});

module.exports = Home;
