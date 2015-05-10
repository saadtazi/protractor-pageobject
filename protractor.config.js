/* global browser:true,protractor:false */
'use strict';

var path = require('path');

var useSauceLabs = !!process.env.USE_SAUCELABS;

console.log('USE_SAUCELABS', useSauceLabs);
console.log('SAUCE_USER', process.env.SAUCE_USER);
console.log('SAUCE_KEY', process.env.SAUCE_KEY);

exports.config = {
  // plugins: [{
  //   path: 'node_modules/protractor/plugins/timeline/index.js',

  //   // Output json and html will go in this folder.
  //   outdir: 'timelines',
  // }],
  // baseUrl: 'http://saadtazi.com',
  seleniumAddress: useSauceLabs ? false : 'http://localhost:4444/wd/hub',
  framework: 'mocha',
  mochaOpts: {
    timeout: 20000
  },
  directConnect: useSauceLabs ? false : true,
  suites: {
    integration: path.join(__dirname, './tests/integration/**/*.spec.js'),
    example: path.join(__dirname, './examples/**/*.spec.js')
  },
  name: 'protractor-pageobject integration tests',
  sauceUser: useSauceLabs ? process.env.SAUCE_USER : false,
  sauceKey: useSauceLabs ? process.env.SAUCE_KEY : false,
  // sauceAgent: useSauceLabs ? true : false,

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