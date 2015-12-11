import UserService from 'services/UserService.js';
import Logger from 'prototypes/Logger.js';
import { Make } from 'modules/make.js';

angular.module('app-mmi').controller('UserEditPageController', ['$scope', function($scope){
    let logger = Make(Logger)('UserEditPageController');

    logger.log('EDIT PAGE!!')
    UserService.user.then(user => {
        $scope.user = user.clone();
    }, error => {
        logger.log(error);
        history.back();
    });
}]);
