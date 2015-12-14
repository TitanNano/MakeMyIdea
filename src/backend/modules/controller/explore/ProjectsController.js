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

        return Storage.queryItems(this.collection, {$query: { title : searchQuery, categories : tagsQuery }, $orderby: sortQuery } , true).then(projects => {
            this.logger.log(projects);
            response.send(projects);
        });

        //return Promise.resolve([]);
    }

}, Controller).get();

export default ExploreProjectsController;
