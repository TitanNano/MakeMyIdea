import './AboutUsController.js';

angular.module('app-mmi').directive('appPageAboutUs', function(){
	return {
		restrict:'E',
		scope: {
			card:'='
		},
		templateUrl:'./directives/aboutUs/Template.html',
		controller: 'AboutUsController'
	}
})
