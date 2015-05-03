/* global sandbox:false */
'use strict';

var lib = require('../../../lib/'),
  Component = lib.Component;

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
      }).should.throw(/provide(.*)element object/);
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