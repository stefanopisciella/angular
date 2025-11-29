(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective);


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  controller.searchTerm = "";

  controller.getMatchedMenuItems = function(searchTerm) {
    MenuSearchService.getMatchedMenuItems(searchTerm).then(function(found) {
      controller.found = found;
    });
  }

  controller.removeMenuItem = function (menutItemToRemoveIndex) {
    MenuSearchService.removeMenuItem(controller.found, menutItemToRemoveIndex);
  };
}

function foundItemsDirective() {
  var ddo = {
    templateUrl: 'template.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: foundItemsDirectiveController,
    controllerAs: 'directiveCtrl',
    bindToController: true
  };

  return ddo;
}

function foundItemsDirectiveController() {

}

MenuSearchService.$inject = ['$q', '$http'];
function MenuSearchService($q, $http) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    if(searchTerm === "") {
      // user clicked the "Narrow It Down For Me!" button but didn't write
      // anything in the inputBox ==> no results should be shown to the user
      return $q.resolve([]);  // it returns a promise that contains an empty array
      // because in this case no results must be shown to the user
    }

    return $http({  // return the promise object
      method: "GET",
      url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
    }).then(function (result) {
        let menus = result.data;
        let found = [];

        for (const [key, value] of Object.entries(menus)) { // looping the menus
          let menu = value;
          let menuItems = menu["menu_items"];

          for(let i=0; i<menuItems.length; i++) { // looping the menu items
            let menuItem = menuItems[i];
            let menuItemDescription = menuItem["description"].toLowerCase();

            if(menuItemDescription.includes(searchTerm.toLowerCase())) {
              found.push(menuItem);
            }
          }
        }

        return found; // return the promise object
    });
  }

  service.removeMenuItem = function (foundItems, menuItemToRemoveIndex) {
    foundItems.splice(menuItemToRemoveIndex, 1);
  };
}

})();
