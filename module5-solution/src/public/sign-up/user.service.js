(function () {
"use strict";

angular.module('restaurant')
.service('UserService', UserService);


UserService.$inject = ['$http'];
function UserService($http) {
  var service = this;

  service.saveUserData = function (user) {
    service.getUserPreferredMenuItem(user.menuItemNum).then(function (result) {
      service.foundUserPreferredMenuItem = result;

      console.log(service.foundUserPreferredMenuItem);
    });
  }

  service.getUserPreferredMenuItem = function (preferredMenuItem) {
    return $http({  // return the promise object
      method: "GET",
      url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
    }).then(function (result) {
      let categories = result.data;
      const keys = Object.keys(categories);

      for (const key of keys) {
        let category = categories[key];
        let categoryMenuItems = category['menu_items'];

        for (let i = 0; i < categoryMenuItems.length; i++) {
          let categoryMenuItem = categoryMenuItems[i];

          if (categoryMenuItem["short_name"] === preferredMenuItem) {
            return categoryMenuItem;
          }
        }
      }

      return false;  // the user preferred menu item was not found
    });

  }


}



})();
