'use strict';

var HomePage = require('../pageobjects/home');

describe('Saad Tazi website', function() {
  var homePage;

  before(function() {
    homePage = new HomePage();
    return homePage.get();
  });

  it('should have a title', function() {
    return homePage.title().should.eventually.eql('Saad Tazi');
  });

  it('should have some panels', function() {
    homePage.element('topSection').getText().should.eventually.contain('Hello, world');
    return homePage.elements('panels').should.eventually.have.length.above(5);
  });
});