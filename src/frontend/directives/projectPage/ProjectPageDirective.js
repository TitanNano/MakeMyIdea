import './ProjectPageController.js';

angular.module('app-mmi').directive('appPageProjectPage', function(){
	return {
		restrict : 'E',
		scope : {},
		templateUrl : './directives/projectPage/Template.html',
        controller : 'ProjectPageController'
	}
})
