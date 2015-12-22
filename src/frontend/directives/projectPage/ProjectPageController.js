import ProjectService from 'services/ProjectService.js';
import UserService from 'services/UserService.js';

angular.module('app-mmi').controller('ProjectPageController', ['$routeParams', '$scope', function($routeParams, $scope){

    $scope.project = null;
    $scope.user = null;

    if ($routeParams.id) {
        ProjectService.getProject($routeParams.id).then(project => {
            $scope.project = project;
            $scope.$apply();
        });

        UserService.user.then(user => {
            $scope.user = user;
            $scope.$apply();
        }, () => {});
    } else {
        location.hash = '/explore';
    }

}]);
