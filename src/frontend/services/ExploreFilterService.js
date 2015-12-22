import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';
import NetworkService from 'services/NetworkService.js';
import EventTarget from 'prototypes/EventTarget.js';
import Project from 'prototypes/Project.js';

let logger = Make(Logger)('ExploreFilterService');

let ExploreFilterService = Make({

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
        if (!this._projectList) {
            this._projectList = NetworkService.resource({resource:'projects', data:this.filterQuery}).then(projectList => {
                return projectList.map(project => Make(project, Project).get());
            });
        } else {
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

                oldProjectList = oldProjectList.concat(newProjectList.map(project => Make(project, Project).get()));
                if (this.filterQuery.sort === 'hot'){
                    oldProjectList.sort(function (a, b) {
                        if (a.views < b.views) {
                            return 1;
                        }
                        if (a.views > b.views) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    });
                }
                logger.log(oldProjectList);
                this.emit('projectsUpdate', oldProjectList);
                return oldProjectList;
            });
        }

    }
}, EventTarget)();

export default ExploreFilterService;
