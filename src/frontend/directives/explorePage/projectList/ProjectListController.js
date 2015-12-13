import ExploreFilterService from 'services/ExploreFilterService.js';
import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';

let logger = Make(Logger)('ProjectListController');

angular.module('app-mmi').controller("ProjectListController", ['$scope', function($scope) {

    ExploreFilterService.list.then(projectList => {
        logger.log(projectList);
        $scope.projectList = projectList;
        $scope.$apply();
    });

    /* Project Data Example
    [
        {
            title : 'Idea1',
            categories:['cat1', 'cat2', 'cat3'],
            description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            neededMembers:['Prog', 'Design', 'Prog'],
            currentMembers:['Peter', 'Hans'],
            views:141
        },
        {
            title:'Idea2',
            categories:['cat1', 'cat3'],
            description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            neededMembers:['Prog', 'Design', 'Prog', 'Adm'],
            currentMembers:['Peter', 'Hans', 'Birgit'],
            views:235
        },
        {
            title:'Idea3',
            categories:['cat3'],
            description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            neededMembers:['Prog', 'Design', 'Prog', 'Dev'],
            currentMembers:['Peter', 'Max'],
            views:123
        },
        {
            title : 'Idea4',
            categories:['cat1', 'cat2', 'cat3'],
            description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            neededMembers:['Prog', 'Design', 'Prog'],
            currentMembers:['Peter', 'Hans'],
            views:112
        },
        {
            title:'Idea5',
            categories:['cat1', 'cat3'],
            description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            neededMembers:['Prog', 'Design', 'Prog', 'Adm'],
            currentMembers:['Peter', 'Hans', 'Birgit'],
            views:245
        },
        {
            title:'Idea6',
            categories:['cat3'],
            description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            neededMembers:['Prog', 'Design', 'Prog', 'Dev'],
            currentMembers:['Peter', 'Max'],
            views:234
        }
    ]
    */

}])
