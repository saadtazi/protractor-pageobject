'use strict';

var _ = require('lodash');
var Page = require('../../../lib/page');

var fieldIds = [
  'button-field',
  'text-field',
  'email-field',
  'password-field',
  'number-field',
  'search-field',
  'tel-field',
  'url-field',
  'checkbox-field-1',
  'checkbox-field-2',
  'radio-field-1',
  'radio-field-2',
  'select-field',
  'multiselect-field',
  'date-field'
];
var FormFieldPage = Page.extend({
  url: 'http://127.0.0.1:3000/form-fields',
  els: _.reduce(fieldIds, function(memo, val) {
    memo[val] = by.id(val);
    return memo;
  }, {}),
  fieldIds: fieldIds
});

module.exports = FormFieldPage;
