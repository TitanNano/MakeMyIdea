import { Make } from '../../make.js';
import Controller from '../../../prototypes/controller.js';
import Storage from '../../Storage.js';

let AuthorizeSigninController = Make({

    name : 'AuthorizeSigninController',

    route : '/api/v1/authorization/flows/:flowNonce?',

    collection : 'auth-flows',

    _make : function(){
        Controller._make.apply(this);

        Storage.setIndex(this.collection, ['flowNonce']);
    },

    post : function(request, response){
        let { flowNonce, type } = request.body;

        this.logger.log(flowNonce, type);

        if (flowNonce && type) {
            let item = {
                flowNonce : flowNonce,
                type : type,
                expires : Date.now() + 1000 * 60 * 3 // expires after 3 minutes
            };

            Storage.saveItem(this.collection, item).then(status => {
                item._id = status.upserted[0]._id;

                response.send(item);
            }, (error) => {
                this.logger.error(error)
            });
        } else {
            response.status(406);
            response.send({
                error : 'nonce and/or type not valid!'
            });
        }
    },

    get : function(request, response){
        let { flowNonce } = request.params;

        return Storage.queryItems('auth-flows', { flowNonce : flowNonce }).then(flow => {
            response.send(flow);
        });
    }

}, Controller).get();

export default AuthorizeSigninController;
