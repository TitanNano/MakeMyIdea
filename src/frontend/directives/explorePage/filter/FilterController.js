import Logger from 'prototypes/Logger.js';
import { Make } from 'modules/make.js';
import ExploreFilterService from 'services/ExploreFilterService.js';

angular.module('app-mmi').controller("FilterController", ['$scope', function($scope) {
    var logger = Make(Logger)('FilterController');
    //let validTags = ['test','tester','testeroni'];

    $scope.options = ['new', 'hot'];
    $scope.tagFilterQuery = [];

    /*$scope.requireMatch = true;

    $scope.querySearch = function(query){
        return query ? validTags.filter(function(fQuery){
            return validTags.indexOf(fQuery) === 0;
        }) : [];
    };*/

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
