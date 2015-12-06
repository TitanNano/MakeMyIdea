import UiService from 'services/UiService.js';

angular.module('app-mmi').controller("AboutUsController", ['$scope', function() {
    UiService.header.status = 'none';
}])
