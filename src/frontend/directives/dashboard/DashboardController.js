//import { Make } from 'modules/make.js';
//import Logger from 'prototypes/Logger.js';

//let logger = Make(Logger)('PublishIdeaController');

angular.module('app-mmi').controller("DashboardController", ['$scope', '$mdDialog', function($scope, $mdDialog) {

    $scope.ownProjects = [{
        title : 'projectObjekt1',
        neededMembers : 12,
        currentMembers : 7
    }, {
        title : 'projectObjekt2',
        neededMembers : 4,
        currentMembers : 0
    }];

    $scope.helpingProjects = [{
        title : 'projectObjekt3',
        neededMembers : 9,
        currentMembers : 6
    }, {
        title : 'projectObjekt4',
        neededMembers : 13,
        currentMembers : 2
    }];

    $scope.finishedProjects = [{
        title : 'projectObjekt5',
        neededMembers : 4,
        currentMembers : 1
    }, {
        title : 'projectObjekt6',
        neededMembers : 3,
        currentMembers : 3
    }];

    $scope.testAction = function(event, cont) {
    $mdDialog.show(
      $mdDialog.alert()
        .title(cont)
        .textContent('This is just a test')
        .ok('Close')
        .targetEvent(event)
    );
  };

}])
