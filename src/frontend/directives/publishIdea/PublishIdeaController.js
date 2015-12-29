import ProjectService from 'services/ProjectService.js';
//import { Make } from 'modules/make.js';
//import Logger from 'prototypes/Logger.js';

//let logger = Make(Logger)('PublishIdeaController');

angular.module('app-mmi').controller("PublishIdeaController", ['$scope', '$routeParams', function($scope, $routeParams) {
    let projectId = $routeParams.id;

    $scope.typeList = ['Web Developer', 'Java Developer', 'C# Developer', 'Web Designer', 'Storywriter', 'Character Designer', 'Front End Developer'];

    $scope.project = {
        categories : [],
        members : [
            {
                users : []
            }
        ],
    };

    if (projectId) {
        ProjectService.getProject(projectId).then(project => {
            $scope.project = project.clone();
            $scope.$apply();
        }, () => {
            location.href = '/home';
        });
    }

    $scope.submit = function(){
        if (projectId) {
            ProjectService.saveProject($scope.project).then(() => {
                location.href = `#/project/${projectId}`;
            });
        } else {
            ProjectService.createProject($scope.project).then(project => {
                location.href = `#/project/${project._id}`;
            });
        }
    };

    $scope.reset = function() {
        history.back();
    };

    $scope.addNewMember = function() {
        $scope.project.members.push({users:[]});
    };

    $scope.removeMember = function(item) {
        let index = $scope.project.members.indexOf(item);
        $scope.project.members.splice(index, 1);
    };

}])
