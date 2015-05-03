/* global browser:true,protractor:false */
'use strict';

var path = require('path');

exports.config = {
  baseUrl: 'http://saadtazi.com',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  framework: 'mocha',
  mochaOpts: {
    timeout: 60000
  },
  specs: [
    path.join(__dirname, './**/*.spec.js')
  ],

  beforeLaunch: function() {},
  onPrepare: function() {
    // do not run scripts that waits for angular...
    browser.ignoreSynchronization = true;

    // add some helpers
    global.elements = browser.findElements;

    // setup mocha, chai...
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');

    chai.use(chaiAsPromised);
    chai.should();
    // global.expect = chai.expect;
    Object.defineProperty(protractor.promise.Promise.prototype, 'should', {
      get: Object.prototype.__lookupGetter__('should'),
      set: Object.prototype.__lookupSetter__('should')
    });


  }
};