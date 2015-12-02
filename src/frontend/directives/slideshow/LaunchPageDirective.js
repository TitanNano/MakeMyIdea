
angular.module('app-mmi').directive('slideshow', function(){
    return {
        restrict:'E',
        scope: {
            card:'='
        },
        templateUrl:'./directives/slideshow/Template.html',
        controller: 'SlideShowController'
    }
})
