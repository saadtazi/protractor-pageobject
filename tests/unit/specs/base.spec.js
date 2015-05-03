'use strict';

var lib = require('../../../lib/'),
  Base = require('../../../lib/base');

describe('#Base', function() {

  var fakeBrowser = {
    fake: 'browser'
  };


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
        /* jshint nonew:false*/
        new Base();
      }).should.throw(/browser is not defined/);
    });

  });

  describe('when the browser is passed when creating the instance', function() {
    it('should not throw', function() {
      var b = new Base({
        browser: fakeBrowser
      });
      b.dv.should.eql(fakeBrowser);

    });
  });

  describe('when browser is injected', function() {

    before(function() {
      lib.inject(fakeBrowser);
    });

    after(function() {
      delete Base.browser;
    });

    it('should not throw', function() {
      var b = new Base();

      Base.browser.should.eql(fakeBrowser);
      b.dv.should.eql(fakeBrowser);
    });

  });
});