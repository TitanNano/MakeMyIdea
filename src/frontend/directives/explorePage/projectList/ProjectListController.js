import ExploreFilterService from 'services/ExploreFilterService.js';

angular.module('app-mmi').controller("ProjectListController", ['$scope', function($scope) {

    ExploreFilterService.list.then(projectList => {
        $scope.projectList = projectList;
        $scope.apply;
    });

    /* Project Data Example
    [
        {
            title : 'Idea1',
            categories:['cat1', 'cat2', 'cat3'],
            description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            neededMembers:['Prog', 'Design', 'Prog'],
            currentMembers:['Peter', 'Hans']
        },
        {
            title:'Idea2',
            categories:['cat1', 'cat3'],
            description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            neededMembers:['Prog', 'Design', 'Prog', 'Adm'],
            currentMembers:['Peter', 'Hans', 'Birgit']
        },
        {
            title:'Idea3',
            categories:['cat3'],
            description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            neededMembers:['Prog', 'Design', 'Prog', 'Dev'],
            currentMembers:['Peter', 'Max']
        }
    ]
    */

}])
