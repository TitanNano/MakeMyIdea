import './angular.js';
import '../libs/angular-carousel.min.js';
import './directives.js';
import { Router, RouteController } from 'modules/Router.js';

angular.module('app-mmi').config(function($routeProvider, $mdThemingProvider) {

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
            'default' : '50',
            'hue-1' : '100'
        });

        Router($routeProvider, {
            '/tec-demo' : 'app-page-tec-demo',
            '/sign-in' : 'app-page-signin',
            '/explore' : 'app-page-explore',
            '/home' : 'app-page-home',
            '/about-us' : 'app-page-about-us',
            '/project' : 'app-page-project-page',
            '/user/edit' : 'app-page-user-edit'
        }, '/home');
}).run(function($rootScope){
    RouteController($rootScope);
})
