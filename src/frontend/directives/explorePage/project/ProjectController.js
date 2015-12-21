angular.module('app-mmi').controller("ProjectController", ['$scope', function($scope) {

    $scope.currentMembers = function(){
        let count = 0;
        $scope.project.members.forEach(item => {
            count += item.users.length
        })
        return count
    }
    $scope.neededMembers = function(){
        let count = 0;
        $scope.project.members.forEach(item => {
            count += item.count
        })
        return count
    }
    $scope.percentMembers = $scope.currentMembers()/$scope.neededMembers()*100;

}])
