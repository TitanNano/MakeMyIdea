import PublishIdeaService from 'services/PublishIdeaService.js';
import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';

let logger = Make(Logger)('PublishIdeaController');

angular.module('app-mmi').controller("PublishIdeaController", ['$scope', function($scope) {

    $scope.typeList = ['Web Developer', 'Java Developer', 'C# Developer', 'Web Designer', 'Storywriter', 'Character Designer', 'Front End Developer'];

    $scope.project = {};
    $scope.project.members = [{users:[]}];
    $scope.project.categories = [];

    $scope.submit = function(){
        logger.log($scope.project);
        PublishIdeaService.publish($scope.project)
    };

    $scope.reset = function() {
        $scope.project = {}
        $scope.project.members = [{users:[]}];
        $scope.project.categories = [];
    };

    $scope.addNewMember = function() {
        $scope.project.members.push({users:[]});
    };

    $scope.removeMember = function(item) {
        let index = $scope.project.members.indexOf(item);
        $scope.project.members.splice(index, 1);
    };

}])
