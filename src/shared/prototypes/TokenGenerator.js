
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
    dictionary : 'ABCDEFGHIJKLMNOPQURTUVWXYZabcdefghijklmnopqrstuvwxyz',

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
    }
};

export default TokenGenerator;
