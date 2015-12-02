

//<script src="http://code.createjs.com/preloadjs-0.4.1.min.js"></script>

angular.module('app-mmi').controller('LaunchPageController', function ($scope, $timeout, QueueService) {
    let INTERVAL = 3000,
        slides = [
            {id:"slideOne", src:"./launchPage/slides/Slide1.png"},
            {id:"slideTwo", src:"./launchPage/slides/Slide2.png"}
        ];

    $scope.slideshow = {
        setCurrentSlideIndex : function(index) {
            $scope.currentIndex = index;
        }
    }

    function isCurrentSlideIndex(index) {
        return $scope.currentIndex === index;
    }

    function nextSlide() {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        $timeout(nextSlide, INTERVAL);
    }

    function setCurrentAnimation(animation) {
        $scope.currentAnimation = animation;
    }

    function isCurrentAnimation(animation) {
        return $scope.currentAnimation === animation;
    }

    function loadSlides() {
        QueueService.loadManifest(slides);
    }

    $scope.$on('queueProgress', function(event, queueProgress) {
        $scope.$apply(function () {
            $scope.progress = queueProgress.progress * 100;
        });
    });

    $scope.$on('queueComplete', function(event, slides) {
        $scope.$apply(function () {
            $scope.slides = slides;
            $scope.loaded = true;

            $timeout(nextSlide, INTERVAL);
        });
    });

    $scope.progress = 0;
    $scope.loaded = false;
    $scope.currentIndex = 0;
    $scope.currentAnimation = 'slide-left-animation';

    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    $scope.setCurrentAnimation = setCurrentAnimation;
    $scope.isCurrentAnimation = isCurrentAnimation;

    loadSlides();
});
