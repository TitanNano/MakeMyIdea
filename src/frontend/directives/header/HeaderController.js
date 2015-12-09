import UiService from 'services/UiService.js';

angular.module('app-mmi').controller('HeaderController', ['$scope',function($scope){
    $scope.config = UiService.header;
    $scope.buttonlist = [
      {title: "Explore", path: "/explore"},
      {title: "Publish Idea", path: "/publish"},
      {title: "About us", path: "/about-us"}
    ];
}]);
