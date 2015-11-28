import './EditorController.js';

angular.module('tec-demo.directives').directive('demoEditor', function(){
	return {
		restrict:'E',
		scope: {},

		templateUrl:'./directives/editor/Template.html',
		controller: 'EditorController'
	};
});
