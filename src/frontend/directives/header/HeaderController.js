import UiService from 'services/UiService.js';

angular.module('app-mmi').controller('HeaderController', ['$scope', function($scope){
    $scope.config = UiService.header;
}]);
