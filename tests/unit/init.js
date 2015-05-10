'use strict';

// setup mocha, chai...
var chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

global.browser = {
  global: 'browser',
  element: function(bySelector) {
    return bySelector + '-element';
  }

};

beforeEach(function() {
  global.sandbox = sinon.sandbox.create();
});

afterEach(function() {
  global.sandbox.restore();
});