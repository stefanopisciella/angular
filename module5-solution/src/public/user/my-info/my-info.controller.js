(function () {

angular.module('restaurant')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user'];
function MyInfoController(user) {
  let ctrl = this;

  ctrl.user = user;
}

})();
