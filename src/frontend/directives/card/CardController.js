import CardService from 'services/CardService.js'

angular.module('tec-demo.directives').controller("CardController", ['$scope', function($scope) {

    $scope.edit = function(card) {

        $scope.editing = true;

        CardService.editCard(card).then(() => {
            $scope.editing = false;
            $scope.$apply();
            location.hash = card._id;
        }, () => {
            $scope.editing = false;
            location.hash = card._id;
        });
    };

    $scope.delete = function(card) {
        CardService.deleteCard(card).then(() => {
            $scope.$apply();
        });
    };

}]);
