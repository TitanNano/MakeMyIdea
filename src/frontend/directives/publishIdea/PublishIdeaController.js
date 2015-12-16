import PublishIdeaService from 'services/PublishIdeaService.js';
import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';

let logger = Make(Logger)('PublishIdeaController');

angular.module('app-mmi').controller("PublishIdeaController", ['$scope', function($scope) {

    $scope.create = function(){
        logger.log($scope.project);
        PublishIdeaService.publish($scope.project)
    };
}])
