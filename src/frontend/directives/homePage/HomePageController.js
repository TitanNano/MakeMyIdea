import UiService from 'services/UiService.js';

angular.module('app-mmi').controller("HomePageController", ['$scope', function($scope) {

    UiService.header.status = 'none';

    $scope.slideList = [
        {
            title: 'Make My Idea? Make Your Idea!',
            content: 'Create, Collaborate, Contribute! Publish your project on MMI to find new Contributors, Supporters and even Friends.',
            buttontext: 'Create a Project',
            buttonurl: 'publish',
            imgurl: './directives/homePage/res/bluebackground.jpg'
        },
        {
            title: 'Merry Christmas and Happy new Year!',
            content: 'Celebrate the festival of love together with us on MMI',
            buttontext: 'Merry Christmas',
            buttonurl: 'https://en.wikipedia.org/wiki/Christmas',
            imgurl: './directives/homePage/res/christmas.jpg'
        },
        {
            title: 'Learn more about Make My Idea',
            content: 'Check out the Idea behind Make My Idea or learn more about our Team and our Passion. You will also find our company imprint over there in case you are into that legal stuff.',
            buttontext: 'More Information',
            buttonurl: 'about-us',
            imgurl: './directives/homePage/res/greenbackground.jpg'
        },
        {
            title: 'Sample Project',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            buttontext: 'Go to Sample',
            buttonurl: 'fehlt noch',
            imgurl: './directives/homePage/res/wood.jpg'
        }
    ]
}])
