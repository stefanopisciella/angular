(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
  var controller = this;

  controller.items = ShoppingListCheckOffService.getToBuyItems();

  controller.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItemFromToBuyList(itemIndex);
  };

  controller.moveItemToAlreadyBoughtList = function (itemName, itemQuantity, itemIndex) {
    ShoppingListCheckOffService.moveItemToAlreadyBoughtList(itemName, itemQuantity, itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var controller = this;

  controller.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [
    { name: "mozzarella", quantity: 2 },
    { name: "tomato sauce", quantity: 3 },
    { name: "cola", quantity: 1 },
    { name: "cheese", quantity: 4 },
    { name: "cake", quantity: 1 }
  ];
  var alreadyBoughtItems = [];

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };

  service.addItemToAlreadyBoughtList = function (itemName, quantity) {
    var item = { name: itemName, quantity: quantity };

    alreadyBoughtItems.push(item);
  };

  service.removeItemFromToBuyList = function (itemIndex) {
    toBuyItems.splice(itemIndex, 1);
  };

  service.moveItemToAlreadyBoughtList = function (itemName, itemQuantity, itemIndex) {
    service.addItemToAlreadyBoughtList(itemName, itemQuantity);
    service.removeItemFromToBuyList(itemIndex);
  };
}

})();
