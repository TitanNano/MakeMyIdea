require('./slide/SlideDirective.js');
require('./HomePageController.js');


angular.module('app-mmi').directive('appPageHome', function(){
	return {
		restrict : 'E',
		scope : {},
		templateUrl : './directives/homePage/Template.html',
        controller : 'HomePageController'
	}
})
