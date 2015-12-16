import { Make } from '../../make.js';
import Controller from '../../../prototypes/controller.js';
import Storage from '../../Storage.js';

let ExploreProjectsController = Make({

    name : 'ExploreProjectsController',

    route : '/api/v1/projects/:id?',

    collection : 'projects',

    get : function(request, response){
        this.logger.log(request.query);

        let { search } = request.query;
        let { sort } = request.query
        let { tags } = request.query;

        let searchQuery = new RegExp(search, "i");

        let sortQuery = { _id : -1 };
        if (sort === 'hot'){
            sortQuery = { views : -1 };
        }

        let tagsQuery = { $exists : true, $ne : null };
        if (tags != ''){
            tagsQuery = { $all : tags.split(',') } ;
        }

        return Storage.findItems({collection:this.collection, find: { title : searchQuery, categories : tagsQuery }, sort: sortQuery , forceList:true}).then(projects => {
            this.logger.log(projects);
            response.send(projects);
        });
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
    },

}, Controller).get();

export default ExploreProjectsController;
