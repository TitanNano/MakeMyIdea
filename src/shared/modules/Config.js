import { Make } from './make.js';
import { ConfigLoader } from './ConfigLoader.js'
import Logger from '../prototypes/Logger.js';

/** @type {Logger} */
let logger = Make(Logger)('Config');

let config = Promise.all([
        ConfigLoader('./config/config.json'),
        ConfigLoader('./config/config.default.json')
    ]).then(values => {
        let [config, configDefault] = values;
        return Make(config, configDefault).get();
    });

let Config = {
    getServerUrl : function(){
        return config.then(config => {
            return `${config.server.host}:${config.server.port}`;
        })
    },

    getDbUrl : function(){
        return config.then(config => {
            return `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
        })
    },

    /**
     * @param {string|string[]} keys
     * @return {Promise<*>}
     */
    get : function(...keys){

        return config.then(config => {
            let list = [];

            keys.forEach(key => {
                let value = config;
                logger.log(key);

                key = key.split('.');

                key.forEach(item => {
                    value = value[item];
                });

                list.push(value);
            });

            return (list.length === 1) ? list[0] : list;
        });
    }
}

export default Config;
