/*global protractor:false*/
'use strict';

var _ = require('lodash'),
  Klass = require('class-extend');

var noop = function() {};

var Base = module.exports = Klass.extend({
  els: {
    /*
    elName: selector,...
    */
  },
  components: {
    /*
    componentName: {
      element: elName,
      model: require('customClass')
    */
  },
  constructor: function(opts) {
    if (!global.browser && !Base.browser) {
      throw Error('you need a browser (`Page.browser = browser;` or `global.browser = browser;`');
    }
    this.dv = global.browser || Base.browser;
    this.options = opts;
    this.initialize.call(this, arguments);
  },
  initialize: noop,

  waitForElement: function(elName, timeout) {
    return this.dv.wait(protractor.until.elementLocated(this.els[elName], timeout));
  },

  element: function(elName) {
    return this.dv.findElement(this.els[elName]);
  },
  elements: function(elName) {
    // no alias set by protactor
    return this.dv.findElements(this.els[elName]);
  },

  component: function(widget) {
    var cmpt = this.components[widget];
    return new (cmpt.model)(_.extend({
        el: this.element(cmpt.element)
      }, cmpt.opts));
  }

});