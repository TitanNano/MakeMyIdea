import { Make } from '../../make.js';
import Controller from '../../../prototypes/controller.js';
import Config from '../../Config.js';
import MegaToken from '../../../prototypes/MegaToken.js';
import Storage from '../../Storage.js';
import AuthorizeManager from '../../AuthorizeManager.js';

let SessionsController = Make({

    name : 'SessionsController',

    route : '/api/v1/sessions/:id?',

    collection : 'sessions',

    _make : function(){
        Controller._make.apply(this);

        Storage.setIndex(this.collection, ['session']);
    },

    /**
     * @param {Request} request
     * @param {ResponseHandler} response
     */
    post : function(request, response){
        let sessionInfo = request.body;

        if (sessionInfo.email && sessionInfo.accessToken) {
            Config.get(`authFlow.${sessionInfo.accessTokenType}`).then(config => {
                let verify = null;

                if (sessionInfo.accessTokenType === 'github') {
                    verify = AuthorizeManager.verifyGithubToken(sessionInfo, config);
                } else {
                    verify = AuthorizeManager.verifyGoogleToken(sessionInfo, config);
                }


                verify.send().then(tokenInfo => {
                    if (tokenInfo.email === sessionInfo.email) {
                        Storage.queryItems('users', { email : sessionInfo.email }).then((user={}) => {
                            /** @type {MegaToken} */
                            let token = Make(MegaToken)();
                            let oldSession = user.session;

                            user.email = user.email || sessionInfo.email;
                            user.session = token.session;

                            Promise.all([
                                Storage.saveItem(this.collection, token),
                                Storage.saveItem('users', user),
                                Storage.saveItem('nonces', { session : user.session, lastServerNonce : null, lastClientNonce : null }),
                                Storage.deleteItem(this.collection, { session : oldSession })
                            ]).then(() => {
                                response.send(token);
                            }, error => { this.logger.error(error); });
                        });
                    } else {
                        response.status(401).send({
                            error : 'OAuth2 token and email or login do not match!'
                        })
                    }

                }, () => {
                    response.status(500).send({ error : 'internal server error '});
                });
            });
        } else {
            response.status(406);
            response.send({
                error : 'not acceptable'
            })
        }
    }

}, Controller).get();

export default SessionsController;
