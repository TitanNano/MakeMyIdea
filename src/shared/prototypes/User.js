import { Make } from '../modules/make.js';
import Logger from './Logger.js';
import Model from './Model.js';

let logger = Make(Logger)('User Constructor');

let User = Make({
    firstName : '',
    lastName : '',
    description : '',
    email : '',

    /**
     * @type {Object}
     * @param {string} token
     */
    tokenData : null,
    incomplete: true,

    /**
     * default avatar
     *
     * @type {string}
     */
    avatar : 'https://placehold.it/150x150?text=Avatar',

    /**
     * @type {Tag[]}
     */
    tags : null,

    _make : function(basic){
        if (!this.tokenData) {
            logger.error('a user needs to have token data!!');
        }

        if (!basic) {
            this.tags = [];
        }
    }
}, Model).get();

export default User;
