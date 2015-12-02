import Logger from 'prototypes/Logger.js';
import { Make } from 'modules/make.js';
import CardService from 'services/CardService.js'

angular.module('app-mmi').controller("CardListController", ['$scope', function($scope) {
    var logger = Make(Logger)('CardListController');

    CardService.cardList.then(cardList => {
        $scope.cardList = cardList;
        $scope.apply;
        logger.log('got the new cards!!');
    });
}])
