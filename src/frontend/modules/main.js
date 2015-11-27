import './angular.js';
import './directives.js';

angular.module('tec-demo.directives')
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey', {
      'default': '600',
      'hue-1': '200',
      'hue-2': '400',
      'hue-3': 'A100'
    })

    .accentPalette('orange', {
      'default': '200'
    })

    .warnPalette('red',{
      'default': '800'
    })

    .backgroundPalette('teal', {
      'default' : '50'
    });
});
