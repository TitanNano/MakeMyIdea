import './authButtonGoogle/AuthButtonGoogleDirective.js';
import './authButtonGithub/AuthButtonGithubDirective.js';
import './authButton/AuthButtonDirective.js';


angular.module('app-mmi').directive('appPageSignin', function(){

    return {
        restrict:'E',
        scope: {},
		templateUrl:'./directives/signInPage/Template.html',
	};

});
