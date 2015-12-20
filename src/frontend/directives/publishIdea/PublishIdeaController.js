import PublishIdeaService from 'services/PublishIdeaService.js';
import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';

let logger = Make(Logger)('PublishIdeaController');

angular.module('app-mmi').controller("PublishIdeaController", ['$scope', function($scope) {

    $scope.jobList = ['Web Developer', 'Java Developer', 'C# Developer', 'Web Designer', 'Storywriter', 'Character Designer', 'Front End Developer'];

    $scope.project = {};
    $scope.project.members = [{}];
    $scope.project.categories = [];

    $scope.submit = function(){
        logger.log($scope.project);
        PublishIdeaService.publish($scope.project)
    };

    $scope.reset = function() {
        $scope.project = {}
        $scope.project.members = [{}];        
        $scope.project.categories = [];
    };

    $scope.addNewChoice = function() {
        $scope.project.members.push({});
    };

    $scope.removeChoice = function() {
        var lastItem = $scope.project.members.length-1;
        $scope.project.members.splice(lastItem);
    };
}])
