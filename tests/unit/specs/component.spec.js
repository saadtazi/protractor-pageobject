/* global sandbox:false */
'use strict';

var lib = require('../../../lib/'),
  Component = lib.Component;

describe('Component', function() {
  describe('#constructor', function() {
    beforeEach(function() {
      sandbox.spy(Component.__super__, 'constructor');
    });
    describe('when no element is passed in the options', function() {
      it('should throw', function() {
        (function() {
          /* jshint nonew:false*/
          new Component({
            not: 'an el'
          });
        }).should.throw(/provide(.*)property(.*)el/);
      });

      it('should not throw if its prototype has a el property', function() {
        var SubComponent = Component.extend({
          el: 'an el'
        });
        var component = new SubComponent({
          not: 'an el'
        });
        component.el.should.be.eql('an el');

      });
    });

    describe('when an element is passed in the options', function() {
      it('should call the Base contructor', function() {
        var component = new Component({
          el: 'an el'
        });
        Component.__super__.constructor.should.have.been.calledOnce;
        component.el.should.be.eql('an el');
      });
    });
  });
});