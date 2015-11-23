import Logger from 'prototypes/Logger.js';
import { Make } from 'modules/make.js';

angular.module('tec-demo.directives').controller("CardListController", ['$scope', 'CardService', function($scope, CardService){
	var logger = Make(Logger)('CardListController');

	$scope.cardList = CardService.getCards();

	$scope.$on('CardServiceListUpdate', function($event, newList){
		$scope.cardList = newList;
		logger.log('got the new cards!!');
	});
}])
