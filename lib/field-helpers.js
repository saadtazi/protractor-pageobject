/* global protractor */
'use strict';

var _ = require('lodash');

// some of the setters were inspired by
// https://github.com/surevine/webdriverjs-helper/blob/master/source/webdriverjs-helper.coffee
function setSelectableValue(el, val) {
  return el.isSelected().then(function(checked) {
    if ((!!val && !checked) || (!val && checked)) {
      return el.click();
    }
  });
}

function setTextValue(el, val) {
  return el.sendKeys(val);

}

var typeSetters = {
  email: setTextValue,
  file: setTextValue,
  number: setTextValue,
  password: setTextValue,
  search: setTextValue,
  tel: setTextValue,
  text: setTextValue,
  textarea: setTextValue,
  url: setTextValue,

  // https://github.com/angular/protractor/issues/562
  // date: function(el, val) {
  //   console.log('val??', val, val.replace(/-/g, protractor.Key.TAB));
  //   return protractor.promise.all(val.split('-').map(function(val) {
  //     setTextValue(el, val);
  //     return setTextValue(el, protractor.Key.TAB);
  //   }));
  // },

  radio: setSelectableValue,
  checkbox: setSelectableValue,

  select: function(el, vals) {
    // is multiple vals we assume it is a multi-select
    if (_.isString(vals)) {
      vals = [vals];
    }
    return el.all(by.tagName('option'))
      .then(function(options) {
        return protractor.promise.all(options.map(function(option) {
          option.getAttribute('value')
            .then(function(value) {
              if (_.contains(vals, value)) {
                return setSelectableValue(option, true);
              }
              // removes everything that is not in vals
              return setSelectableValue(option, false);
            });
        }));
      });

  },
  unknown: function(el, val) {
    console.error('field setter not implemented', val);
    throw new Error('field setter not implemented');
  }
};


var knownInputTypes = [
  'checkbox',
  'email',
  'file',
  'password',
  'number',
  'radio',
  'text',
  'search',
  'tel',
  'url' //,
  // 'date'
];

function getInputType(inputType) {
  if (_.contains(knownInputTypes, inputType)) {
    return inputType;
  }
  return 'unknown';
}

function getFieldType(el) {
  return el.getTagName()
    .then(function(tagName) {
      // console.log('getTagName', tagName);
      if (tagName.match(/textarea/i)) {
        return 'textarea';
      }
      if (tagName.match(/select/i)) {
        return 'select';
      }
      if (tagName.match(/input/i)) {
        return el.getAttribute('type')
          .then(function(inputType) {
            return getInputType(inputType);
          });
      }
      return 'unknown';
    });
}

module.exports = {
  getType: getFieldType,
  set: function(el, value) {
    return this.getType(el)
      .then(function(type) {
        return typeSetters[type](el, value);
      });
  },
  setters: typeSetters
};