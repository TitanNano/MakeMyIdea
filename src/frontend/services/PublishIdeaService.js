import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';
import NetworkService from 'services/NetworkService.js';

let logger = Make(Logger)('PublishIdeaService');

let PublishIdeaService = {

    publish : function(idea){
        logger.log('Idea: ', idea)
        return NetworkService.resource({ resource : 'projects', method : 'POST', data : {
            title : idea.title,
            description : idea.description,
            categories : idea.categories,
            members : idea.members
        }})
    }
};

export default PublishIdeaService;
