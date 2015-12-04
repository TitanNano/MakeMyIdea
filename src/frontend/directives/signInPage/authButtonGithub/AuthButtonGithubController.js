import { Make } from 'modules/make.js';
import TokenGenerator from 'prototypes/TokenGenerator.js';
import NetworkService from 'services/NetworkService.js';
import Logger from 'prototypes/Logger.js';

angular.module('app-mmi').controller('AuthButtonGithub', ['$scope', function($scope){

    /** @type {Logger} */
    let logger = Make(Logger)('AuthButtonGithub');

    /**
     * @type {tokenGenerator}
     */
    let tokenGenerator = Make(TokenGenerator)();

    let GithubOAuthData = {
        client_id : '59b0a9d691c006819f63'
    };

    $scope.startAuthFlow = function(){
        let nonce = tokenGenerator.getNonce();
        let dialog = window.open('', '', 'height=500,width=500,menubar=no,toolbar=no,personalbar=no,dependend=yes,minimizable=no,resizeable=no,chrome=yes,centerscreen=yes');
        let data = {
            flowNonce : nonce,
            type : 'github'
        }

        NetworkService.resource({ resource : 'authorization/flows', data : data, method : 'POST' }).then(() => {
            dialog.location = `https://github.com/login/oauth/authorize?client_id=${GithubOAuthData.client_id}&scope=user&state=${nonce}`;

            }, error => logger.error(error));
    }

    let onMessage = function(e){
        let { data } = e;

        if (typeof data === 'object' && data.type == 'github' && data.status === 'done') {
            let { state } = data.data;

            state = decodeURIComponent(state);

            NetworkService.resource({ resource : `authorization/flows/${state}`, method : 'GET'}).then(response => {
                let user = {
                    firstName : '',
                    lastName : '',
                    email : '',
                    tokenData : {
                        accessToken : response.accessToken
                    }
                };

                logger.log(user);
            });
        }
    }

    window.addEventListener('message', onMessage);

}]);
