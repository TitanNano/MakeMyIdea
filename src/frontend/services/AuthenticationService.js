import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js'

let logger = Make(Logger)('AuthenticationService');

let AuthenticationService = {

    OAUTH2 : 'oauth2',
    MMI : 'mmi',

    /**
     * @param {NetworkRequest} networkRequest
     * @param {string} type
     * @param {string|MegaToken} token
     */
    authenticate : function(networkRequest, type, token) {
        if (type === this.OAUTH2) {
            logger.log('authenticating request (OAuth2)');
            networkRequest.setHeader('Authorization', `Bearer ${token}`);
        } else if (type === this.MMI) {
            logger.log('authenticating request (MMI)');
        }
    },

    /**
     * @param {User} user
     */
    authorize : function(user) {

    }
};

export default AuthenticationService;
