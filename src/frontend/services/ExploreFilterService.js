import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';
import NetworkService from 'services/NetworkService.js';

let logger = Make(Logger)('ExploreFilterService');

let ExploreFilterService = {

    _projectList : null,

    get list(){
        if(!this._projectList){
            this._execute().then();
        }
        return this._projectList;
    },

    filterQuery : {
        search:'',
        sort:'new',
        tags:[]
    },

    searchQuery : function(query){
        this.filterQuery.search = query;
        this._execute();
    },

    sortQuery : function(query){
        this.filterQuery.sort = query;
        this._execute();
    },

    tagFilterQuery :function(query){
        this.filterQuery.tags = query;
        this._execute();
    },

    _execute : function(){
        logger.log(this.filterQuery);
        NetworkService.resource({resource:'explore/projects', data:this.filterQuery}).then(projectList => {
                this._projectList = projectList;
                logger.log(this._projectList);
                return Promise.resolve();
            });
    }
};

export default ExploreFilterService;
