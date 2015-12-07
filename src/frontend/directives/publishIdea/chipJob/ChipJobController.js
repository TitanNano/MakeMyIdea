import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';

(function () {
  angular.module('app-mmi').controller('ChipJob', DemoCtrl);
  function DemoCtrl ($timeout, $q) {
    var self = this;
    self.readonly = false;
    // Lists of fruit names and Vegetable objects
    self.jobs = ['Apple', 'Banana', 'Orange'];
  }
})();
