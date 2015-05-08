'use strict';

var _ = require('lodash');

var Page = require('./form-field-page');
var FormFieldResultsPage = Page.extend({
  url: 'http://127.0.0.1:3000/form-fields-results',
  els: _.extend(Page.prototype.els, {
    'radio-field': by.id('radio-field'),
    results: by.id('results')
  })
});

module.exports = FormFieldResultsPage;
