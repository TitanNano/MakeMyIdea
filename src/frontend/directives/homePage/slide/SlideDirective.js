angular.module('app-mmi').directive('slide', function(){
	return {
		restrict : 'E',
		scope : {
            slide:'='
        },
		templateUrl : './directives/homePage/slide/Template.html'
	}
})
