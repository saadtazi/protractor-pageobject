'use strict';

var GooglePage = require('../pageobjects/google/home');

describe('Google Landing Page', function() {
  var googlePage;

  before(function() {
    googlePage = new GooglePage();
    return googlePage.get();
  });


  it('should allow to search', function() {

    googlePage.search('saad tazi');

    var results = googlePage.component('resultContainer');

    return results.getAll().count().should.eventually.be.at.least(9);
  });
});