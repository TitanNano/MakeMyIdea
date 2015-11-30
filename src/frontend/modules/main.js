import './angular.js';
import './directives.js';

angular.module('tec-demo.directives')
.config(function($mdThemingProvider, $routeProvider) {
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

    $routeProvider
    .when('/tec-demo', {
        template : '<app-page-tec-demo></app-page-tec-demo>'
    })

    .otherwise('/tec-demo');
});
