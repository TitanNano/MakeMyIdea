import './DashboardController.js'

angular.module('app-mmi').directive('appPageDashboard', function(){

    return {
        restrict:'E',
        scope: {},
		templateUrl:'./directives/dashboard/Template.html',
        controller:'DashboardController'
	};

});
