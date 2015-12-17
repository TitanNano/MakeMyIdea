import './ChipJobController.js';

angular.module('app-mmi').directive('appChipJob', function(){

    return {
        restrict:'E',
        scope: {
            categories : '=appCategories'
        },
		templateUrl:'./directives/publishIdea/chipJob/Template.html',
        controller : 'ChipJob'
	};

});
