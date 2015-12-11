import { Make } from '../modules/make.js';
import Logger from './Logger.js';

/** @type Logger */
let logger = Make(Logger)('TokenGenerator');

let TokenGenerator = {

    /**
     * @type {number}
     */
    seed : 0,

    /**
     * @type {number}
     */
    state : 0,

    /**
     * @type {string}
     * @const
     */
    dictionary : 'ABCDEFGHIJKLMNOPQURTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',

    _make : function(){
        this.seed = Math.floor(Math.random() * 255 * 64);
    },

    /**
     * @return {string}
     */
    getNonce : function(){
        let nonce = '';

        for (let i = 0; i < 64; i++) {
            let index = Math.random() * this.dictionary.length;

            index += ((this.state + i) * this.seed);
            index = index % this.dictionary.length;

            nonce += this.dictionary.charAt(index);
        }

        this.state += 1;

        return btoa(nonce);
    },

    /**
     * @param {number} [length]
     */
    getToken : function(length=128){
        let token = '';

        for (let i = 0; i < length; i+=1) {
            let index = Array.prototype.reduce.apply(crypto.getRandomValues(new Uint16Array(1)),
            [(prev, next) => { return prev + next }, 0]);

            index += (this.state + i) * this.seed;
            index = index % this.dictionary.length;

            token+= this.dictionary.charAt(index);
        }

        this.state += 1;

        return btoa(token);
    },

    /**
     * @param {number} length
     * @return {string}
     */
    getHex : function(length) {
        let number = Array.prototype.reduce.apply(crypto.getRandomValues(new Uint32Array(Math.round(length / 32))),
            [(prev, next) => {
                logger.log(prev.toString(16), next.toString(16));
                return prev + next.toString(16);
            }, '']);

        return number;
    }
};

export default TokenGenerator;
