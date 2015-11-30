import { Make } from './make.js';
import {ConfigLoader} from './ConfigLoader.js'

let config = Promise.all([ConfigLoader('./config/config.json'), ConfigLoader('./config/config.default.json')]).then(values => {
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
    }
}

export default Config;
