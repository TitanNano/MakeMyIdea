import './CardListController.js';

angular.module('tec-demo.directives').directive('demoCardList', function(){
	return {
		restrict:'E',
		scope: {
		},
		templateUrl:'./directives/cardList/Template.html',
		controller: 'CardListController'
	}
})
