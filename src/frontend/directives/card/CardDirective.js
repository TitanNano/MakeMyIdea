import './CardController.js';

angular.module('app-mmi').directive('demoCard', function(){
	return {
		restrict:'E',
		scope: {
			card:'='
		},
		templateUrl:'./directives/card/Template.html',
		controller: 'CardController'
	}
})
