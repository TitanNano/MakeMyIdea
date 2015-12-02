import './CardListController.js';

angular.module('app-mmi').directive('demoCardList', function(){
	return {
		restrict:'E',
		scope: {
		},
		templateUrl:'./directives/cardList/Template.html',
		controller: 'CardListController'
	};
})
