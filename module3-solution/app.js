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
}

function foundItemsDirective() {
  var ddo = {
    templateUrl: 'template.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'ctrl',
    bindToController: true
  };

  return ddo;
}

MenuSearchService.$inject = ['$q', '$http'];
function MenuSearchService($q, $http) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    if(searchTerm === "") {
      // user clicked the "Narrow It Down For Me!" button but didn't write
      // anything in the inputBox ==> no results should be shown to the user
      return $q.resolve([]);
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

            if(menuItem["description"].includes(searchTerm)) {
              found.push(menuItem);
            }
          }
        }

        return found; // return the promise object
    });
  }
}

})();
