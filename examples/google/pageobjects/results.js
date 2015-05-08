'use strict';

// TODO: use a ItemList
var Component = require('../../../lib').Component;

var Results = Component.extend({
  els: {
    result: by.css('li.g')
  },

  getAll: function() {
    return this.elements('result');
  }

});

module.exports = Results;
