import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';

(function () {
  angular.module('app-mmi').controller('ChipJob', DemoCtrl);
  function DemoCtrl ($scope) {
    $scope.readonly = false;
    // Lists of fruit names and Vegetable objects
    $scope.jobs = ['Web Developer', 'Java Developer', 'C# Developer', 'Web Designer', 'Storywriter', 'Character Designer', 'Front End Developer'];
  }
})();
