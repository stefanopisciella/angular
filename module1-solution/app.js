(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.message = "";

  $scope.evaluate = function() {
    if($scope.dishes === "") {
      $scope.message = "Please enter data first";
    } else {
      var dishes = $scope.dishes.split(',');

      if (dishes.length <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
    }
  }
}

})();
