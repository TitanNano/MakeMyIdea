import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';
import NetworkService from 'services/NetworkService.js';
import TokenGenerator from 'prototypes/TokenGenerator.js';
import EventTarget from 'prototypes/EventTarget.js';

let logger = Make(Logger)('AuthenticationService');
let tokenGenerator = Make(TokenGenerator)();

let AuthenticationService = Make(/** @lends AuthenticationService.prototype */{

    OAUTH2 : 'oauth2',
    MMI : 'mmi',

    /**
     * @type {MegaToken}
     */
    _megaToken : null,

    _lastNonce : null,

    _lastServerNonce : null,

    /**
     * @constructs
     * @emits AuthenticationService#authorized
     * @emits AuthenticationService#restored
     * @extends EventTarget
     */
    _make : function(){
        EventTarget._make.apply(this);

        this.defineEvent('restored', {
            onlyOnce : true
        });

        this.load();
    },

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
                    this.save();
//                    this._lastServerNonce = serverNonce;
                });
            }
        }
    },

    /**
     * Authorize a new session
     *
     * @param {User} user
     * @return {Promise<User>}
     * @emits AuthenticationService#authorized
     */
    authorize : function(user) {
        if (user.tokenData.accessToken) {
            this._lastNonce = null;
            this._lastServerNonce = null;
            this._megaToken = null;
            this.save();

            return NetworkService.resource({ resource : 'sessions', method : 'POST', data : {
                email : user.email,
                accessToken : user.tokenData.accessToken,
                accessTokenType : user.tokenData.accessTokenType
            }}).then(session => {
                this._megaToken = session;
                this.emit('authorized');
                this.save();
            });
        } else {
            return Promise.reject('Invalide user!');
        }
    },

    restoreSession : function(){

    },

    save : function(){
        let block = {
            megaToken : this._megaToken,
            lastServerNonce : this._lastServerNonce,
            lastNonce : this._lastNonce
        };

        sessionStorage.setItem('app-mmi.AuthenticationService', JSON.stringify(block));
    },

    /**
     * @emits AuthenticationService#authorized
     * @emits AuthenticationService#restored
     */
    load : function() {
        let block = sessionStorage.getItem('app-mmi.AuthenticationService');

        if (block) {
            try {
                block = JSON.parse(block);

                this._lastNonce = block.lastNonce;
                this._lastServerNonce = block.lastServerNonce;
                this._megaToken = block.megaToken;
                this.emit('authorized');
                this.emit('restored');
            } catch (e) {
                logger.log(e);
            }
        }
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
}, EventTarget)();

export default AuthenticationService;
