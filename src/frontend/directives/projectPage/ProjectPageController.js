import UiService from 'services/UiService.js';

angular.module('app-mmi').controller('ProjectPageController', ['$scope', function($scope){
    $scope.config = UiService.header;
}]);
