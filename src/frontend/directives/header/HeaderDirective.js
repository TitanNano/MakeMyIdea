import './HeaderController.js';

angular.module('app-mmi').directive('demoHeader', function(){
	return {
		restrict : 'E',
		scope : {},
		templateUrl : './directives/header/Template.html',
        controller : 'HeaderController'
	}
})
