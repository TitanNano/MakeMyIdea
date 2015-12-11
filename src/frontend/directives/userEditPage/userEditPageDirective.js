import './UserEditPageController.js';

angular.module('app-mmi').directive('appPageUserEdit', function(){
	return {
		restrict : 'E',
		scope : {},
		templateUrl : './directives/userEditPage/Template.html',
        controller : 'UserEditPageController',
	}
})
