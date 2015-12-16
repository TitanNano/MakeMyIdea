import './slide/SlideDirective.js';
import './HomePageController.js';
import UiService from 'services/UiService.js';


angular.module('app-mmi').directive('appPageHome', function(){
	return {
		restrict : 'E',
		scope : {},
		templateUrl : './directives/homePage/Template.html',
        controller : 'HomePageController',
        link : function(scope, element) {
            element.on('$destroy', () => {
                UiService.header.status = 'raised';
            })
        }
	}
})
