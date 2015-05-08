/* global sandbox */
'use strict';

var lib = require('../../../lib/'),
  Base = require('../../../lib/base');

describe('Base class', function() {

  var fakeBrowser = {
    fake: 'browser'
  };

  describe('#constructor', function() {

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

  describe('#component', function() {
    var SubBase, subBase, SubComponent;

    beforeEach(function() {
      global.element = function(bySelector) {
        return bySelector + '-element';
      };
      SubComponent = sandbox.spy();

      SubBase = Base.extend({
        els: {
          el1: 'elm1', // should be something like by.css('selector')
          el2: 'elm2'
        },
        comps: {
          el1: SubComponent,
          el2: {
            model: SubComponent,
            options: {
              other: 'options'
            }
          }
        }
      });
      subBase = new SubBase();
    });

    afterEach(function() {
      delete global.element;
    });

    it('should be able to retrieve a component (simple form)', function() {
      subBase.component('el1');
      SubComponent.should.have.been.calledWith({
        el: 'elm1-element'
      });
    });

    it('should be able to retrieve a component ((not so) complex form)', function() {
      subBase.component('el2');
      SubComponent.should.have.been.calledWith({
        el: 'elm2-element',
        other: 'options'
      });
    });
  });
});