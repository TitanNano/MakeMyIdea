import UiService from 'services/UiService.js';
import './TheMissionTab/TheMissionTabDirective.js'

angular.module('app-mmi').controller("AboutUsController", ['$scope', function($scope) {

    UiService.header.status = 'none';

    $scope.tabList = [
        {
            title : 'The Mission',
            url: './directives/aboutUs/content/mission.html'

        },
        {
            title : 'The Team',
            url: './directives/aboutUs/content/team.html'
        },
        {
            title : 'The Imprint',
            url: './directives/aboutUs/content/imprint.html'
        }
    ]

}])
