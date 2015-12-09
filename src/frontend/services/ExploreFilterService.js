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
                let toDeleteOld = [];
                let toDeleteNew = [];
                oldProjectList.forEach(oldProject => {
                    let index = newProjectList.findIndex(newProject => { return newProject._id === oldProject._id});
                    if (index < 0){
                        toDeleteOld.push(oldProject);
                    }
                    else{
                        toDeleteNew.push(newProjectList[index]);
                    }
                });
                toDeleteOld.forEach(itemOld => {
                    oldProjectList.splice(oldProjectList.indexOf(itemOld), 1);
                });
                toDeleteNew.forEach(itemNew => {
                    newProjectList.splice(newProjectList.indexOf(itemNew), 1);
                });

                oldProjectList = oldProjectList.concat(newProjectList)
                logger.log(oldProjectList);
                return oldProjectList;
            });
        }

    }
};

export default ExploreFilterService;
