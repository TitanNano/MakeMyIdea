import UiService from 'services/UiService.js';
import {RouteListener} from 'modules/Router.js';

angular.module('app-mmi').controller('HeaderController', ['$scope',function($scope){
    $scope.config = UiService.header;
    $scope.buttonlist = RouteListener().filter(item => {
      return item.header;
    })
}]);
