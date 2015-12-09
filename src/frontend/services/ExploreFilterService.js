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
        if(!this._projectList){
            this._projectList = NetworkService.resource({resource:'projects', data:this.filterQuery});
        }
        else{
            Promise.all([NetworkService.resource({resource:'projects', data:this.filterQuery}), this._projectList]).then(([newProjectList, oldProjectList]) => {
                let toDelete = [];
                oldProjectList.forEach(oldProject => {
                    let index = newProjectList.findIndex(newProject => { return newProject._id === oldProject._id});
                    logger.log('Index: ', index);
                    if (index < 0){
                        logger.log('Delete: ', oldProject);
                        toDelete.push(oldProject);
                    }
                })
                toDelete.forEach(item => {
                    oldProjectList.splice(oldProjectList.indexOf(item), 1);
                });
                
                logger.log(oldProjectList);
                return oldProjectList;
            });
        }

    }
};

export default ExploreFilterService;
