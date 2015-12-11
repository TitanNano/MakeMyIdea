import { Make } from 'modules/make.js';
import TokenGenerator from 'prototypes/TokenGenerator.js';
import NetworkService from 'services/NetworkService.js';
import Logger from 'prototypes/Logger.js';
import Config from 'modules/Config.js';
import UserService from 'services/UserService.js';

angular.module('app-mmi').controller('AuthButton', ['$scope', function($scope){

    /**
     * @param {Object} user
     * @return {Object}
     */
    let processUser = function(user){
        let email, firstName, lastName;

        if (user.emails) {
            user.emails.forEach(item => {
                if (item.type === 'account') {
                    email = item.value;
                }
            });
        }

        if (user.name && typeof user.name === 'object') {
            firstName = user.name.givenName;
            lastName = user.name.familyName;
        }

        if (user.name && typeof user.name === 'string') {
            let [givenName, familyName] = user.name.split(' ');

            firstName = givenName;
            lastName = familyName;
        }

        if (user.email) {
            email = user.email;
        }

        /**
         * @type {Object}
         * @property {string} email
         * @property {string} firstName
         * @property {string} lastName
         */
        return {
            email : email,
            firstName : firstName,
            lastName : lastName,
            login : user.login
        };
    }

    Config.get(`authFlow.${$scope.type}`).then(config => {

        /** @type {Logger} */
        let logger = Make(Logger)(`AuthButton<${$scope.type}>`);

        /** @type {tokenGenerator} */
        let tokenGenerator = Make(TokenGenerator)();

        let nonce = null;

        $scope.startAuthFlow = function(){
            nonce = tokenGenerator.getNonce();

            let windowFeatures = {
                height : 500,
                width : 500,
                menubar : 'no',
                toolbar : 'no',
                personalbar : 'no',
                dependend : 'yes',
                minimizable : 'no',
                resizeable : 'no',
                chrome : 'yes',
                centerscreen : 'yes'
            };

            windowFeatures = Object.keys(windowFeatures).map(key => {
                return `${key}=${windowFeatures[key]}`;
            }).join(',');

            let dialog = window.open('', '', windowFeatures);

            let data = {
                flowNonce : nonce,
                type : $scope.type
            };

            NetworkService.resource({ resource : 'authorization/flows', data : data, method : 'POST' }).then(() => {
                dialog.location = `${config.authUrl}?client_id=${config.clientId}&scope=${config.scope}&state=${nonce}&response_type=token&redirect_uri=${config.redirectUrl}`;
            }, error => logger.error(error));
        }

        /**
         * gets executed as soon as the authentication provider is done.
         *
         * @param {Event} e
         */
        let onMessage = function(e){
            let { data } = e;

            let onToken = response => {
                logger.log(response);

                NetworkService.oauth2Request(config.userResource, response.accessToken, null, { method : 'GET' }).then(userInfo => {
                    let user = processUser(userInfo);

                    user.tokenData = {
                        accessToken : response.accessToken,
                        accessTokenType : $scope.type
                    };

                    logger.log(user);
                    UserService.signIn(user).then(() => {
                        location.hash = '/user/edit';
                    });
                });
            };

            if (typeof data === 'object' && data.status === 'done' && data.data.state === nonce) {
                let { state } = data.data;

                state = decodeURIComponent(state);

                if (data.type !== 'none') {
                    NetworkService.resource({ resource : `authorization/flows/${state}`, method : 'GET'}).then(onToken)
                } else {
                    onToken({ accessToken : data.data.access_token})
                }
            }
        }

        window.addEventListener('message', onMessage);
    });

}]);
