import './FilterController.js';

angular.module('app-mmi').directive('filter', function(){
	return {
		restrict : 'E',
		scope : {},
		templateUrl : './directives/explorePage/filter/Template.html',
        controller : 'FilterController'
	}
})
