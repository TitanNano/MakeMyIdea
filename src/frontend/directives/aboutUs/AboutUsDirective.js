import './AboutUsController.js';
import UiService from 'services/UiService.js';

angular.module('app-mmi').directive('appPageAboutUs', function(){
	return {
		restrict:'E',
		scope: {
			card:'='
		},
		templateUrl:'./directives/aboutUs/Template.html',
		controller: 'AboutUsController',

        link : function(scope, element) {
            element.on('$destroy', () => {
                UiService.header.status = 'raised';
            })
        }
	}
})
