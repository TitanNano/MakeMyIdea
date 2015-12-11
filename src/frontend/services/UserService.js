import Logger from 'prototypes/Logger.js';
import { Make } from 'modules/make.js';
import NetworkService from 'services/NetworkService.js';
import User from 'prototypes/User.js';
import AuthenticationService from 'services/AuthenticationService.js';

let logger = Make(Logger)('UserService');

let UserService = {

    /**
     * @private
     * @type {Promise<User>}
     */
    _currentUser : Promise.reject('not ready!'),

    /**
     * @param {string} id
     * @return {Promise<User>}
     */
    loadUser : function(id) {
        logger.log('loading user', id);
        return this._currentUser = NetworkService.resource({ resource : `user/${id}`, method : 'GET' }).then(user => {
            return Make(user, User).get();
        });
    },

    /**
     * Returns the current user
     *
     * @return {User}
     */
    get user(){
        return this._currentUser;
    },

    /**
     * creates a new user from the given data.
     *
     * @param {Object} userData
     * @return {Promise<User>}
     */
    signIn : function(userData){
        let user = Make(userData, User)(true);

        return this._currentUser = AuthenticationService.authorize(user).then(() => {
            return NetworkService.resource({ resource : 'users/self', method : 'GET' });
        }).then(userData => {
            let user = Make(userData, User).get();

            user.firstName = userData.firstName;
            user.lastName = userData.lastName;
            user.tokenData = userData.tokenData;
            user.tags = userData.tags || [];

            return user;
        });
    }

};

export default UserService;
