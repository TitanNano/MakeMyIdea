import './HeaderUserAreaController.js';

angular.module('app-mmi').directive('appHeaderUserArea', function(){
	return {
		restrict : 'E',
		scope : {},
		templateUrl : './directives/header/HeaderUserArea/Template.html',
		controller: 'HeaderUserAreaController'
	}
})
