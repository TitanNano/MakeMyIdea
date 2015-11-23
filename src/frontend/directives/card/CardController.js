angular.module('tec-demo.directives').controller("CardController", ['$scope', 'CardService', function($scope, CardService) {

    $scope.delete = function(item) {
        CardService.delCard(item);
    }

}])
