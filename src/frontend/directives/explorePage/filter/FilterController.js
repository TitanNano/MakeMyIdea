import Logger from 'prototypes/Logger.js';
import { Make } from 'modules/make.js';
import ExploreFilterService from 'services/ExploreFilterService.js';

angular.module('app-mmi').controller("FilterController", ['$scope', function($scope) {
    var logger = Make(Logger)('FilterController');

    $scope.options = ["new","hot"];
    $scope.tagFilterQuery = [];

    $scope.search = function(){
        logger.log($scope.searchQuery);
        ExploreFilterService.searchQuery($scope.searchQuery);
    };

    $scope.sort = function(){
        logger.log($scope.sortQuery.trim());
        ExploreFilterService.sortQuery($scope.sortQuery.trim());
    };

    $scope.tagFilter = function(){
        logger.log($scope.tagFilterQuery);
        ExploreFilterService.tagFilterQuery($scope.tagFilterQuery);
    };
}])
