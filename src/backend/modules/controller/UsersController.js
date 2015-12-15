import { Make } from '../make.js';
import Controller from '../../prototypes/controller.js';
import Storage from '../Storage.js';

let UsersController = Make({

    name : 'UsersController',

    route : '/api/v1/users/:id?',

    _make : function(){
        Controller._make.apply(this);

        Storage.setIndex('users', ['email']);
    },

    post : function(request, response){
        let user = request.body;

        Storage.saveItem('users', user, 'email').then(() => {
            return Storage.queryItems('users', { email : user.email });
        }, error => this.logger.log(error)).then(user => {
            this.logger.log(user);
            response.send(user);
        });
    },

    get : function(request, response){
        let { id } = request.params;

        this.logger.log(request.authenticated);

        if (request.authenticated) {
            if (id === 'self') {
                Storage.queryItems('users', { session : request.session.session }).then(user => {
                    response.send(user);
                })
            } else {
                response.send({});
            }
        } else {
            response.status(401).send();
        }
    },

    put : function(request, response){
        let { id } = request.params;

        if (request.authenticated && id === 'self') {
            let userData = request.body;
            let { _id } = userData;

            delete userData.email;
            delete userData.session;
            delete userData._id;

            Storage.saveItem('users', { $set : userData }, { _id : Storage.ObjectId(_id) }).then(() => {
                return Storage.getItem('users', _id);
            }).then(user => {
                this.logger.log(user);
                response.send(user)
            });
        } else {
            response.status(401).send({
                error : 'unauthorized'
            });
        }
    }

}, Controller).get();

export default UsersController;
