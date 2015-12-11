import TokenGenerator from './TokenGenerator.js';
import { Make } from '../modules/make.js';

/** @type {TokenGenerator} */
let tokenGenerator = Make(TokenGenerator)();

let MegaToken = {

    token : null,
    restore : null,
    session : null,

    _make : function(){

        this.token = [
            tokenGenerator.getToken(),
            tokenGenerator.getToken(),
            tokenGenerator.getToken(),
        ];

        this.restore = tokenGenerator.getToken(64);

        this.session = tokenGenerator.getHex(128);

    }

};

export default MegaToken;
