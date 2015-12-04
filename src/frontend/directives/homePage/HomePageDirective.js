require('./slide/SlideDirective.js');

angular.module('app-mmi').directive('appPageHome', function(){
	return {
		restrict : 'E',
		scope : {},
		templateUrl : './directives/homePage/Template.html'
	}
})
