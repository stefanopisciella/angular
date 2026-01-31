(function () {

angular.module('restaurant')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService'];
function SignUpController(UserService) {
  let ctrl = this;

  ctrl.signUp = function () {
    UserService.saveUserData(ctrl.user).then(function (userRegistered) {
      ctrl.userRegistered = userRegistered;
      ctrl.userSubmittedForm = true;
    });
  };
}

})();
