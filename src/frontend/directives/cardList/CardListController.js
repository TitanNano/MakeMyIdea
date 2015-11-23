angular.module('tec-demo.directives').controller("CardListController", ['$scope', 'CardService', function($scope, CardService){
	$scope.cardList = CardService.getCards();

	$scope.$on('CardServiceListUpdate', function($event, newList){
		$scope.cardList = newList;
		console.log('got the new cards!!');
	});
}])
