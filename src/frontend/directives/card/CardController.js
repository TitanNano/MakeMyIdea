import CardService from 'services/CardService.js'

angular.module('app-mmi').controller("CardController", ['$scope', function($scope) {

    $scope.edit = function(card) {

        $scope.editing = true;

        CardService.editCard(card).then(() => {
            $scope.editing = false;
            $scope.$apply();
        }, () => {
            $scope.editing = false;
        });
    };

    $scope.delete = function(card) {
        CardService.deleteCard(card).then(() => {
            $scope.$apply();
        });
    };

}]);
