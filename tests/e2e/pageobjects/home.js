'use strict';

var Page = require('../../../lib/page');

var Home = Page.extend({
  url: '/',
  els: {
    topSection: by.css('.jumbo-container'),
    panels: by.css('.panel')
  }
});

module.exports = Home;
