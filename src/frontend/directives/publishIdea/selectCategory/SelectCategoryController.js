import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';

angular.module('app-mmi').controller('SelectCategory', ['$scope', function($scope){

    let logger = Make(Logger)('SelectCategory');

    $scope.selected = '';

    $scope.categories = ('Webpage WebApp AndroidApp iOSApp Test').split(' ').map(function(cat) {
        return {abbrev: cat};
      })
      error => logger.error(error);
  }]);
