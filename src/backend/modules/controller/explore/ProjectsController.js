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
        let { tags } = request.query;

        let searchQuery = new RegExp(search, "i");
        let tagsQuery = { $exists : true, $ne : null };
        if (tags != ''){
            tagsQuery = { $all : tags.split(',') } ;
        }


        return Storage.queryItems(this.collection, { title : searchQuery, categories : tagsQuery }, true).then(projects => {
            this.logger.log(projects);
            response.send(projects);
        });

        //return Promise.resolve([]);
    }

}, Controller).get();

export default ExploreProjectsController;
