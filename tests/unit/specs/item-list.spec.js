/* global sandbox:false */
'use strict';

var lib = require('../../../lib/'),
  ItemList = lib.ItemList;

describe('ItemList', function() {
  describe('#constructor', function() {
    beforeEach(function() {
      sandbox.spy(ItemList.__super__, 'constructor');
    });
    describe('when no `itemsEl` is passed in the options nor the prototype', function() {
      it('should throw', function() {
        (function() {
          /* jshint nonew:false*/
          new ItemList({
            not: 'an itemsEl property'
          });
        }).should.throw(/provide(.*)itemsEl/);
      });

      it('should not throw if its prototype has a `itemsEl property', function() {
        var SubItemList = ItemList.extend({
          els: {
            'the items els key': 'the selector'
          },
          itemClass: 'the class',
          itemsEl: 'the items els key'
        });
        var list = new SubItemList({
          not: 'an item'
        });
        list.itemsKey.should.be.eql('the items els key');

      });
    });

    describe('when no `itemsClass` is passed in the options nor the prototype', function() {
      it('should throw', function() {
        (function() {
          /* jshint nonew:false*/
          new ItemList({
            itemsEl: 'an itemsEl property'
          });
        }).should.throw(/provide(.*)itemClass/);
      });
    });

    describe('when items` is passed in the options', function() {
      it('should call the Base contructor', function() {
        var list = new ItemList({
          itemsEl: 'the items key',
          itemClass: 'the class',
          els: {
            'the items key': 'the selector'
          }
        });
        ItemList.__super__.constructor.should.have.been.calledOnce;
        list.itemsKey.should.be.eql('the items key');
      });
    });
  });

});