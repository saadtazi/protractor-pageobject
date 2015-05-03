'use strict';

// setup mocha, chai...
var chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

global.browser = {
  global: 'browser'
};

beforeEach(function() {
  global.sandbox = sinon.sandbox.create();
});

afterEach(function() {
  global.sandbox.restore();
});