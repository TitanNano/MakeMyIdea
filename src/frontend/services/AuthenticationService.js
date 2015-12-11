import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';
import NetworkService from 'services/NetworkService.js';
import TokenGenerator from 'prototypes/TokenGenerator.js';

let logger = Make(Logger)('AuthenticationService');
let tokenGenerator = Make(TokenGenerator)();

let AuthenticationService = {

    OAUTH2 : 'oauth2',
    MMI : 'mmi',

    /**
     * @type {MegaToken}
     */
    _megaToken : null,

    _lastNonce : null,

    _lastServerNonce : null,

    /**
     * @param {NetworkRequest} networkRequest
     * @param {string} type
     * @param {string|MegaToken} [token]
     */
    authenticate : function(networkRequest, type, token) {
        if (type === this.OAUTH2) {
            logger.log('authenticating request (OAuth2)');
            networkRequest.setHeader('Authorization', `Bearer ${token}`);
        } else if (type === this.MMI) {
            let nonce = tokenGenerator.getNonce();

            logger.log('authenticating request (MMI)', networkRequest);
            networkRequest.setHeader('Auth-Nonce', nonce);

            if (this._megaToken) {
                let token = this._megaToken.token[this._chooseToken()];

                networkRequest.setHeader('Auth-Token', token);
                networkRequest.setHeader('Auth-Session', this._megaToken.session);

                networkRequest.onReady(() => {
//                    let serverNonce = xhr.getResponseHeader('Auth-Nonce');

                    this._lastNonce = nonce;
//                    this._lastServerNonce = serverNonce;
                });
            }
        }
    },

    /**
     * @param {User} user
     */
    authorize : function(user) {
        if (user.tokenData.accessToken) {
            return NetworkService.resource({ resource : 'sessions', method : 'POST', data : {
                email : user.email,
                accessToken : user.tokenData.accessToken,
                accessTokenType : user.tokenData.accessTokenType
            }}).then(session => {
                this._megaToken = session;
            });
        } else {
            return Promise.reject('Invalide user!');
        }
    },

    restoreSession : function(){

    },

    /**
     * @private
     * @return {number}
     */
    _chooseToken : function(){
        let client = this._lastNonce ? this._lastNonce.split('').reduce((n, char) => n + char.charCodeAt(0), 0) : 0;
        let server = this._lastServerNonce ? this._lastServerNonce.split('').reduce((n, char) => n + char.charCodeAt(0), 0) : 0;

        let merged = parseInt(server.toString(16) + client.toString(16), 16);

        return (merged % this._megaToken.token.length);
    }
};

export default AuthenticationService;
