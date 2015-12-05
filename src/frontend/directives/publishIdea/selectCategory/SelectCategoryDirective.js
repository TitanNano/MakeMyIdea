import './SelectCategoryController.js';

angular.module('app-mmi').directive('appSelectCategory', function(){

    return {
        restrict:'E',
        scope: {},
		templateUrl:'./directives/publishIdea/selectCategory/Template.html',
        controller : 'SelectCategory'
	};

});
