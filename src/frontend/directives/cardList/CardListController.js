import Logger from 'prototypes/Logger.js';
import { Make } from 'modules/make.js';
import CardService from 'services/CardService.js'

angular.module('tec-demo.directives').controller("CardListController", ['$scope', function($scope) {
    var logger = Make(Logger)('CardListController');

    CardService.cardList.then(cardList => {
        $scope.cardList = cardList;

        logger.log('got the new cards!!');
    });
}])
