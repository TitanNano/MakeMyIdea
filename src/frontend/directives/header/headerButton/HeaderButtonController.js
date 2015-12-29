angular.module('app-mmi').controller('HeaderButtonController', ['$scope', '$location',function($scope, $location){
    $scope.jump = function () {
        $location.path( $scope.config.path || $scope.config.route );
        console.log("Success");
    };
}]);
