/* global gapi */

import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';

angular.module('app-mmi').controller('AuthButtonGoogle', ['$scope', function($scope){

    let logger = Make(Logger)('AuthButtonGoogle');

    let googleAPI = document.createElement('script');
    googleAPI.src = 'https://apis.google.com/js/api:client.js';

    (new Promise((success) => {
        googleAPI.addEventListener('load', () => {
            let GoogleAPI = gapi;

            GoogleAPI.load('auth2', success);
        });
    })).then(() => {
        return new Promise((success, failure) => {
            let GoogleAPI = gapi;

            logger.log('inizializing google auth button...');

            let Auth2 = GoogleAPI.auth2.init({
                client_id : '1075540561942-vchi1ljb9a87it0c867894n3gla3jmcc.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
            });

            let element = document.querySelector('#auth-button-google');

            Auth2.attachClickHandler(element, {}, success, failure);

            $scope.apiReady = true;
            $scope.$apply();
        });
    }).then(googleUser => {
        let profile = googleUser.getBasicProfile();

        let user = {
            firstName : profile.getGivenName(),
            lastName : profile.getFamilyName(),
            email : profile.getEmail(),
            tokenData : googleUser.getAuthResponse()
        };

        logger.log('user', user);
    }, error => logger.error(error));

    document.body.appendChild(googleAPI);
}]);
