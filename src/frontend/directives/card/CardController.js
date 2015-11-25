import CardService from 'services/CardService.js'

angular.module('tec-demo.directives').controller("CardController", ['$scope', function($scope) {

    $scope.delete = function(item) {
        CardService.deleteCard(item);
    }

}])
