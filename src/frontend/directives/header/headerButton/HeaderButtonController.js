angular.module('app-mmi').controller('HeaderButtonController', ['$scope', '$location',function($scope, $location){
    $scope.jump = function () {
      $location.path( $scope.config.path );
      console.log("Success");
    };

}]);
