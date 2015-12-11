import { Make } from './make.js';
import NetworkRequest from '../prototypes/NetworkRequest.js';
import Storage from './Storage.js';
import Logger from '../prototypes/Logger.js';

/** @type {Logger} */
let logger = Make(Logger)('AuthorizeManager');

let AuthorizeManager = {

    /**
     * @param {Object} nonces
     */
    _chooseToken : function({ lastClientNonce, lastServerNonce }, length){
        let client = lastClientNonce ? lastClientNonce.split('').reduce((n, char) => n + char.charCodeAt(0), 0) : 0;
        let server = lastServerNonce ? lastServerNonce.split('').reduce((n, char) => n + char.charCodeAt(0), 0) : 0;

        let merged = parseInt(server.toString(16) + client.toString(16), 16);

        return (merged % length);
    },

    verifyGithubToken : function(sessionInfo, config){
        logger.log(config);
        let verify = Make(NetworkRequest)(config.userResource, { method : 'GET', ssl : true });

        verify.headers({
            'Authorization' : `Bearer ${sessionInfo.accessToken}`,
            'User-Agent' : 'MakeMyIdea-Server'
        });

        return verify;
    },

    verifyGoogleToken : function(sessionInfo, config){
        logger.log(config);
        let verify = Make(NetworkRequest)(`${config.verifyUrl}${sessionInfo.accessToken}`, { method : 'GET', ssl : true });

        return verify;
    },

    request : function(protect, request, response, next) {
        let session = request.header('Auth-Session');
        let token = request.header('Auth-Token');
        let clientNonce = request.header('Auth-Nonce');

        logger.log('authorizing request...');
        request.authenticated = false;

        if (session) {
            Promise.all([
                Storage.queryItems('nonces', { session : session }),
                Storage.queryItems('sessions', { session : session })
            ]).then(([nonces, session]) => {
                let correctToken = null;

                if (nonces) {
                    correctToken = session.token[this._chooseToken(nonces, session.token.length)];
                }

                if (session && token === correctToken) {
                    request.authenticated = true;
                    request.session = session;
                    nonces.lastClientNonce = clientNonce;
                }

                return Storage.saveItem('nonces', nonces);
            }).then(() => next());
        } else {
            next();
        }
    }
}

export default AuthorizeManager;
