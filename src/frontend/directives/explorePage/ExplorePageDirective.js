require('./project/ProjectDirective.js');
require('./projectList/ProjectListDirective.js');
require('./filter/FilterDirective.js');

angular.module('app-mmi').directive('appPageExplore', function(){
	return {
		restrict : 'E',
		scope : {},
		templateUrl : './directives/explorePage/Template.html'
	}
})
