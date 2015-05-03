'use strict';

var Base = require('../../../lib/base');

describe('#Base', function() {
  describe('when browser is not defined globally', function() {
    var _browser;

    before(function() {
      _browser = global.browser;
      delete global.browser;
    });

    after(function() {
      global.browser = _browser;
    });

    it('should throw if no browser is defined', function() {
      (function() {
        new Base();
      }).should.throw(/browser is not defined/);
    });

  });
});