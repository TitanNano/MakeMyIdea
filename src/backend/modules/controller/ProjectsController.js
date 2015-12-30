import { Make } from '../make.js';
import Controller from '../../prototypes/controller.js';
import Storage from '../Storage.js';

let ExploreProjectsController = Make({

    name : 'ExploreProjectsController',

    route : '/api/v1/projects/:id?',

    collection : 'projects',

    get : function(request, response){
        let { id } = request.params;

        if (id) {
            Storage.getItem(this.collection, id).then(project => {
                this.logger.log('sending:', project);

                response.send(project);
            });
        } else {
            this.logger.log(request.query);

            let { sort } = request.query
            let sortQuery = { _id : -1 };
            let { search } = request.query;
            let { tags } = request.query;
            let { userProjects } = request.query;

            if (request.authenticated && userProjects) {
                return Storage.findItems({
                    collection : this.collection,
                    find : {
                        'memebers.users' : ''
                    } 
                })
            }

            if (sort && sort === 'hot'){
                sortQuery = { views : -1 };
            }

            let findQuery = {};
            if (search && search != ''){
                findQuery.title = new RegExp(search, "i");
            }
            if (tags && tags != ''){
                findQuery.categories = { $all : tags.split(',') } ;
            }

            return Storage.findItems({collection:this.collection, find: findQuery, sort: sortQuery , forceList:true}).then(projects => {
                this.logger.log(projects);
                response.send(projects);
            });
        }
    },

    post : function(request, response){

        if (true) { //request.authenticated

            let project = request.body;

            Storage.saveItem(this.collection, project).then(status => {
                if (status.upserted){
                    project._id = status.upserted[0]._id;
                }

                this.logger.log('Project: ', project);
                response.send(project);
            }, (error) => {
                this.logger.error(error)
            });
        }
    }

}, Controller).get();

export default ExploreProjectsController;
