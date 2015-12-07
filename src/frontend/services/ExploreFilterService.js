import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';
import NetworkService from 'services/NetworkService.js';

let logger = Make(Logger)('ExploreFilterService');

let ExploreFilterService = {

    _projectList : null,

    get list(){
        if(!this._projectList){
            this._execute();
        }
        return this._projectList;
    },

    filterQuery : {
        search:'',
        sort:'',
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
        this.filterQuery.sort = query;
        this._execute();
    },

    _execute : function(){
        logger.log(this.filterQuery);
        return this._projectList = Promise.resolve([]);
        /*NetworkService.resource({resource:'projects', data:this.filterQuery}).then(projectList => {
                this._projectList = projectList;
                return this._projectList;
            });*/
    }
};

export default ExploreFilterService;
