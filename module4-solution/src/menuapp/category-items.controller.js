(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryItemsController', CategoryItemsController);

CategoryItemsController.$inject = ['categoryItems', 'MenuDataService', '$stateParams'];
function CategoryItemsController(categoryItems, MenuDataService, $stateParams) {
  let categoryItemsController = this;

  categoryItemsController.categoryShortName = $stateParams.categoryShortName;
  categoryItemsController.categoryItems = categoryItems;
}

})();
