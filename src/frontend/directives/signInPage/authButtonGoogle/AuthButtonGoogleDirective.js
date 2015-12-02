import './AuthButtonGoogleController.js';

angular.module('app-mmi').directive('appAuthButtonGoogle', function(){

    return {
        restrict:'E',
        scope: {},
		templateUrl:'./directives/signInPage/authButtonGoogle/Template.html',
        controller : 'AuthButtonGoogle'
	};

});
