import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';
import NetworkService from 'services/NetworkService.js';
import Project from 'prototypes/Project.js';

let logger = Make(Logger)('PublishIdeaService');

let ProjectService = {

    /**
     * @param {Object} idea
     * @return {Promise<Project>}
     */
    createProject : function(idea){
        logger.log('Idea: ', idea)
        return NetworkService.resource({ resource : 'projects', method : 'POST', data : {
            title : idea.title,
            description : idea.description,
            categories : idea.categories,
            members : idea.members
        }});
    },

    getProject : function(id) {
        return NetworkService.resource({ resource : `projects/${id}`, method : 'GET' })
            .then(project => Make(project, Project).get());
    }
};

export default ProjectService;
