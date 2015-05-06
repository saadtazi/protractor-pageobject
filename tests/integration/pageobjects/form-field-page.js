'use strict';

var _ = require('lodash');
var Page = require('../../../lib/page');

var fieldIds = [
  'button-field',
  'text-field',
  'password-field',
  'select-field',
  'multiselect-field',
];
var FormFieldPage = Page.extend({
  url: 'http://127.0.0.1:3000/form-fields',
  els: _.reduce(fieldIds, function(memo, val) {
    memo[val] = by.id(val);
    return memo;
  }, {})
});

module.exports = FormFieldPage;
