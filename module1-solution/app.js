(function () {
'use strict';

angular.module('lunchChecker', [])
.controller('lunchController', lunchController);

lunchController.$inject = ['$scope'];
function lunchController($scope) {
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



    //
    console.log(dishes);
  }

  /*
    $scope.name = "Yaakov";
    $scope.stateOfBeing = "hungry";

    $scope.sayMessage = function () {
      return "Yaakov likes to eat healthy snacks at night!";
    };

    $scope.feedYaakov = function () {
      $scope.stateOfBeing = "fed";
    }; */
}

})();
