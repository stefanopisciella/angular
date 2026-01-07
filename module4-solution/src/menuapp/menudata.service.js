(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$q', '$http']
function MenuDataService($q, $http) {
  var service = this;

  service.getAllCategories = function () {
    return $http({  // return the promise object
      method: "GET",
      url: "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json"
    }).then(function (result) {
      let categories = result.data;
      return categories;
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    let url = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/"
    url += categoryShortName;
    url += ".json";

    return $http({  // return the promise object
      method: "GET",
      url: url
    }).then(function (result) {
      let menuItems = result.data["menu_items"];
      return menuItems;
    });
  }
}
})();
