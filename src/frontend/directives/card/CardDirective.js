import './CardController.js';

angular.module('tec-demo.directives').directive('demoCard', function(){
	return {
		restrict:'E',
		scope: {
			item:'='
		},
		templateUrl:'./directives/card/Template.html',
		controller: 'CardController'
	}
})
