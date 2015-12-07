import UiService from 'services/UiService.js';
import './TheMissionTab/TheMissionTabDirective.js'

angular.module('app-mmi').controller("AboutUsController", ['$scope', function($scope) {

    UiService.header.status = 'none';

    $scope.tabList = [
        {
            title : 'The Mission',
            content: '<app-the-mission-tab></app-the-mission-tab>'
        },
        {
            title : 'The Team',
            content: '<app-the-team-tab></app-the-team-tab>'
        },
        {
            title : 'The Imprint',
            content: '<app-the-imprint-tab></app-the-imprint-tab>'
        }
    ]

}])
