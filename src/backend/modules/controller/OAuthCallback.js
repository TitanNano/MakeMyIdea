import Controller from '../../prototypes/controller.js';
import { Make } from '../make.js';
import Storage from '../Storage.js';
import NetworkRequest from '../../prototypes/NetworkRequest.js';
import Config from '../Config.js';

let OAuthCallbackController = Make({

    name : 'OAuthCallbackController',

    route : '/oauth/callback.html',

    _make : function(){
        Controller._make.apply(this);
    },

    /**
     * @param {Request} request
     * @param {ResponseHandler} response
     */
    get : function(request, response){
        let { state, code } = request.query;
        let type = null;

        this.logger.log(state, code);

        Storage.queryItems('auth-flows', { flowNonce : state }).then(flow => {

            type = flow.type;

            return Config.get(
                `authFlow.${flow.type}.accessTokenUrl`,
                `authFlow.${flow.type}.clientId`,
                `authFlow.${flow.type}.clientSecret`
            ).then(([url, client_id, client_secret]) => {
                /** @type {NetworkRequest} */
                let request = Make(NetworkRequest)(url, { ssl : true });

                return request.headers({
                    'Accept' : 'application/json'
                }).body({
                    client_id : client_id,
                    client_secret : client_secret,
                    state : flow.flowNonce,
                    code : code
                }).send();
            }).then(response => {
                this.logger.log(response);

                flow.accessToken = response.access_token;

                return Storage.saveItem('auth-flows', flow);
            });
        }).then(() => {
            response.sendFunction(this.oAuthCallback, `'${type}'`);
        }, error => this.logger.log('Storage error', error));

    },

    oAuthCallback : function(window, type){
        let query = window.location.search.substr(1);

        query = query.split('&').reduce((o, item) => {
            item = item.split('=');

            return o[item[0]] = item[1], o;
        }, {});

        window.opener.postMessage({
            type : type,
            status : 'done',
            data : query
        }, this.location);

        window.close();
    }

}, Controller).get();

export default OAuthCallbackController;
