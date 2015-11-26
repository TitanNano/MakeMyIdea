import CardService from 'services/CardService.js'

angular.module('tec-demo.directives').controller("CardController", ['$scope', function($scope) {

    $scope.delete = function(card) {
        CardService.deleteCard(card).then(() => {
            $scope.$apply();
        });
    };
}])
