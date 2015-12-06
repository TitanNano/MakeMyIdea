angular.module('app-mmi').controller("ProjectController", ['$scope', function($scope) {

    $scope.project.percent = $scope.project.currentMembers.length/$scope.project.neededMembers.length*100;

}])
