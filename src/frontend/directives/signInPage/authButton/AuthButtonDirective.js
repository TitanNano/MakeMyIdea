import './AuthButtonController.js';

angular.module('app-mmi').directive('appAuthButton', function(){

    return {
        restrict : 'E',
        scope : {
            type : '@'
        },
		templateUrl :'./directives/signInPage/authButton/Template.html',
        controller : 'AuthButton',
        transclude : true
	};

});
