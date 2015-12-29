//import { Make } from 'modules/make.js';
//import Logger from 'prototypes/Logger.js';

//let logger = Make(Logger)('PublishIdeaController');

angular.module('app-mmi').controller("DashboardController", ['$scope', '$mdDialog', function($scope, $mdDialog) {

    $scope.ownProjects = ['projectObjekt1', 'projectObjekt2'];

    $scope.helpingProjects = ['projectObjekt3', 'projectObjekt4'];

    $scope.finishedProjects = ['projectObjekt5', 'projectObjekt6'];

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
