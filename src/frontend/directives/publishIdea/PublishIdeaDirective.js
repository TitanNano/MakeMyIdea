import './selectCategory/SelectCategoryDirective.js';

angular.module('app-mmi').directive('appPagePublish', function(){

    return {
        restrict:'E',
        scope: {},
		templateUrl:'./directives/publishIdea/Template.html',
	};

});
