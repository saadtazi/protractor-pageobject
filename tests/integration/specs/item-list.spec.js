'use strict';

var List = require('../pageobjects/item-list');
var Item = require('../pageobjects/item');

describe('ItemList', function() {
  var itemList;

  before(function() {
    itemList = new List();
    return itemList.get();
  });


  describe('#items()', function() {
    it('should facilitate access to items', function() {
      return itemList.items().should.eventually.have.length(10);
    });

    it('should return Component instance', function() {
      return itemList.items().then(function(components) {
        return components.forEach(function(component, index) {
          component.should.be.an.instanceOf(Item);
          return protractor.promise.all([
            component.element('title').getText(),
          component.element('description').getText()])
            .then(function(arr) {
              arr[0].should.be.eql('Title #' + (index + 1));
              arr[1].should.be.eql('This is the description of item #' + (index + 1));
            });
        });
      });
    });

  });
});