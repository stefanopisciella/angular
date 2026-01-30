(function () {

angular.module('restaurant')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService'];
function SignUpController(UserService) {
  var ctrl = this;

  ctrl.signUp = function () {
    UserService.saveUserData(ctrl.user);
  };
}

})();
