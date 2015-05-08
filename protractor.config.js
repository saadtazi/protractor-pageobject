/* global browser:true,protractor:false */
'use strict';

var path = require('path');

exports.config = {
  // plugins: [{
  //   path: 'node_modules/protractor/plugins/timeline/index.js',

  //   // Output json and html will go in this folder.
  //   outdir: 'timelines',
  // }],
  // baseUrl: 'http://saadtazi.com',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'mocha',
  mochaOpts: {
    timeout: 60000
  },
  directConnect: true,
  suites: {
    integration: path.join(__dirname, './tests/integration/**/*.spec.js'),
    example: path.join(__dirname, './examples/**/*.spec.js')
  },

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