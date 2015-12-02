

angular.module('app-mmi').directive('appPageLaunch', function(){
	return {
		restrict:'E',
		scope: {
			card:'='
		},
		templateUrl:'./directives/launchPage/Template.html',
		controller: 'LaunchPageController'
	}
})
