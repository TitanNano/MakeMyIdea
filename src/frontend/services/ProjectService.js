import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';
import NetworkService from 'services/NetworkService.js';
import Project from 'prototypes/Project.js';

let logger = Make(Logger)('PublishIdeaService');

let ProjectService = {

    _lastProject : null,

    /**
     * @param {Object} idea
     * @return {Promise<Project>}
     */
    createProject : function(idea){
        logger.log('Idea: ', idea);
        this._lastProject = null;
        
        return NetworkService.resource({ resource : 'projects', method : 'POST', data : {
            title : idea.title,
            description : idea.description,
            categories : idea.categories,
            members : idea.members
        }});
    },

    saveProject : function(project){
        this._lastProject = null;

        return NetworkService.resource({ resource : 'projects', method : 'post', data : project });
    },

    fetchProject : function(id){
        return this._lastProject = NetworkService
            .resource({ resource : `projects/${id}`, method : 'GET' })
            .then(project => Make(project, Project).get());
    },

    getProject : function(id) {
        if (this._lastProject) {
            return this._lastProject.then(project => {
                if (project._id == id) {
                    return this._lastProject;
                } else {
                    return this.fetchProject(id);
                }
            });
        } else {
            return this.fetchProject(id);
        }
    }
};

export default ProjectService;
