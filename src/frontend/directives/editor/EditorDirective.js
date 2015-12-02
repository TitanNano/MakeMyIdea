import './EditorController.js';

angular.module('app-mmi').directive('demoEditor', function(){
	return {
		restrict:'E',
		scope: {},

		templateUrl:'./directives/editor/Template.html',
		controller: 'EditorController'
	};
});
