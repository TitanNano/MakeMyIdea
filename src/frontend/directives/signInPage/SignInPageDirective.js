import './authButtonGoogle/AuthButtonGoogleDirective.js';
import './authButtonGithub/AuthButtonGithubDirective.js';


angular.module('app-mmi').directive('appPageSignin', function(){

    return {
        restrict:'E',
        scope: {},
		templateUrl:'./directives/signInPage/Template.html',
	};

});
