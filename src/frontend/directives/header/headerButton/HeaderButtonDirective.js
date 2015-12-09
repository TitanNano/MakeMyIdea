import './HeaderButtonController.js';

angular.module('app-mmi').directive('appHeaderButton', function(){
	return {
		restrict : 'E',
		scope : {config: "=appConfig"},
		templateUrl : './directives/header/headerButton/Template.html',
		controller: 'HeaderButtonController'
	}
})
