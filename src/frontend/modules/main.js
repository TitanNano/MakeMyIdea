import './angular.js';
import './directives.js';
import '../libs/angular-carousel.min.js';

angular.module('app-mmi')
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

    .when('/sign-in', {
        template : '<app-page-signin flex="grow" layout></app-page-sign-in>'
    })

    .when('/explore', {
        template: '<app-page-explore flex="grow" layout></app-page-explore>'
    })

    .when('/home', {
        template: '<app-page-home flex="grow" layout></app-page-home>'
    })

    .otherwise('/tec-demo');
});
