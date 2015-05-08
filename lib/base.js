/*global protractor:false, browser, element */
'use strict';

var _ = require('lodash'),
  Klass = require('class-extend'),
  fieldHelpers = require('./field-helpers');


var noop = function() {};

var Base = module.exports = Klass.extend({
  els: {
    /*
    elName: selector,...
    */
  },
  comps: {
    /*
    eName: {
      model: require('customClass'),
      opts: {}
    },
    elName2: require('custom2')
    */
  },
  constructor: function(opts) {
    var optBrowser = opts && opts.browser;
    if (!optBrowser && !global.browser && !Base.browser) {
      throw Error([
        'browser is not defined. ',
        'Use `Page.browser = browser;`, ',
        '`global.browser = browser;` ',
      'or `require(\'protractor-pageobject\').inject(browser);`'].join(''));
    }
    this.browser = optBrowser || Base.browser || global.browser;
    if (!this.dv) {
      this.dv = this.browser;
    }
    this.options = opts;
    this.initialize.call(this, arguments);
  },
  initialize: noop,

  waitForElement: function(elName, timeout) {
    return this.dv.wait(protractor.ExpectedConditions.visibilityOf(this.element(elName)), timeout);
  },

  getElementSelector: function(elName) {
    var elementSelector = this.els[elName];
    if (!elementSelector) {
      throw new Error('cannot find element "' + elName + '"');
    }
    return elementSelector;
  },

  element: function(elName) {
    // protractor element
    return element(this.getElementSelector(elName));
  },
  elements: function(elName) {
    // no alias set by protactor
    return element.all(this.getElementSelector(elName));
  },

  isElementPresent: function(elName) {
    return browser.isElementPresent(this.getElementSelector(elName));
  },

  component: function(componentName) {
    var cmpt = this.comps[componentName];
    var CmptModel = cmpt.model || cmpt;
    return new CmptModel(_.extend({
        el: this.element(componentName)
      }, cmpt.options || {}));
  },

  setFieldValue: function(el, value) {
    // if a component, we assume it has a setValue...
    if (this.components[el]) {
      var component = this.component(el);
      if (component.setValue) {
        return component.setValue(value);
      }
    }
    // if that instance has a corresponding `set` method
    var methodName = _.camelCase('set-' + el);
    if (this[methodName]) {
      return this[methodName](el, value);
    }
    // ... else we need to figure out how to set the value
    return fieldHelpers.set(this.element(el), value);
  },

  setFields: function(opts) {
    return protractor.promise.all(_.map(opts, function(val, el) {
      return this.setFieldValue(el, val);
    }.bind(this)));
  }

});