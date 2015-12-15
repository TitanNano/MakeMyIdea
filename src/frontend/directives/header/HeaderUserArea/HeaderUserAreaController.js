import AuthenticationService from 'services/AuthenticationService.js';
import UserService from 'services/UserService.js';

angular.module('app-mmi').controller('HeaderUserAreaController', ['$scope', '$mdDialog', function($scope, $mdDialog){

    $scope.user = null;

    $scope.loginDialog = function(event) {
        console.log(event);
        $mdDialog.show({
//            controller: DialogController,
            templateUrl: './directives/signInPage/Template.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
        })
        .then(() => {
            UserService.user.then(user => {
                $scope.user = user;
                $scope.$apply();
            });
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };

    AuthenticationService.on('restored', () => {
        UserService.loadUser('self').then(user => {
            $scope.user = user;
            $scope.$apply();
        });
    });

}]);
