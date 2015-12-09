import UiService from 'services/UiService.js';

angular.module('app-mmi').controller('HeaderController', ['$scope', '$location',function($scope, $location){
    $scope.config = UiService.header;
    $scope.jump = function ( hash ) {
      $location.path( hash );
    };
}]);
