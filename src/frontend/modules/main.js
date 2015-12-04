import './angular.js';
import '../libs/angular-carousel.min.js';
import './directives.js';
import { Router } from 'modules/Router.js';

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

    Router($routeProvider, {
        '/tec-demo' : 'app-page-tec-demo',
        '/sign-in' : 'app-page-signin',
        '/explore' : 'app-page-explore',
        '/home' : 'app-page-home',
        '/about-us' : 'app-page-about-us'
    }, '/home');
});
