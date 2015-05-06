'use strict';

var Page = require('../pageobjects/form-field-page');
var ResultsPage = require('../pageobjects/form-field-results-page');

describe.only('Form Fields', function() {
  var page, resultsPage;

  before(function() {
    page = new Page();
    resultsPage = new ResultsPage();
    return page.get();
  });

  it('should allow to set a textfield', function(done) {
    page.setFieldValue('text-fiedld', 'coucou');
    page.setFieldValue('text-field', 'coucou');
    page.element('button-field').click();
    resultsPage.waitForElement('results', 5000);

    setTimeout(function() {
      done();
    }, 100);
  });
});