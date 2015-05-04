/*global browser:false */
'use strict';

var _ = require('lodash');

var Base = require('./base');

module.exports = Base.extend({

  get: function() {
    this.dv.get(_.isFunction(this.url) ? this.url() : this.url);
    this.afterGet();
    return browser;
  },

  /**
  * allows to wait for things to happen
  */
  afterGet: _.noop,

  title: function() {
    return browser.getTitle();
  },

  currentUrl: function() {
    return browser.getCurrentUrl();
  }

});