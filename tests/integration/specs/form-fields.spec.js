/* global protractor:false */
'use strict';

var _ = require('lodash');

var Page = require('../pageobjects/form-field-page');
var ResultsPage = require('../pageobjects/form-field-results-page');

describe.only('Form Fields', function() {
  var page, resultsPage;
  var fields = {
    'text-field': 'text-field-value',
    'email-field': 'email@field.value',
    'password-field': 'password-field-value',
    'number-field': '102938475',
    'search-field': 'search-field-value',
    'tel-field': 'tel-field-value',
    'url-field': 'http://url-field-value.com',
    'checkbox-field-1': false,
    'checkbox-field-2': 'checkbox-field-2-value',
    'radio-field-2': 'radio-field-value-2', // use true
    'select-field': 'select-field-value-1',
    'multiselect-field': [
      'multiselect-field-value-2',
      'multiselect-field-value-4'
    ]
  };

  before(function() {
    page = new Page();
    resultsPage = new ResultsPage();
    return page.get();
  });

  it('should allow to set fields individually', function() {
    return protractor.promise.all(
      _.map(fields, function(val, el) {
        return page.setFieldValue(el, val);
      })
    ).then(function() {
      page.element('button-field').click();

      resultsPage.waitForElement('results', 5000);
      return protractor.promise.all(_.map(fields, function(val, el) {
        if (el === 'multiselect-field') {
          val = val.join(',');
        }
        if (el === 'checkbox-field-1') {
          return resultsPage.isElementPresent(el)
            .should.eventually.become.false;
        }
        if (el === 'radio-field-2') {
          el = 'radio-field';
        }
        return resultsPage.element(el).getText()
          .should.eventually.be.eql(val);
      }));
    });
  });
});