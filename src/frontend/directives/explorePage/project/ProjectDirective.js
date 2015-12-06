import './ProjectController.js';

angular.module('app-mmi').directive('project', function(){
	return {
		restrict : 'E',
        scope: {
			project:'='
		},
		templateUrl : './directives/explorePage/project/Template.html',
        controller : 'ProjectController'
	}
})
