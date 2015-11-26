import Controller from '../../prototypes/controller.js';

import { Make } from '../make.js';
import Storage from '../Storage.js';

export default Make({

	name : 'CardSaveController',
	route : '/api/v1/card/save.json',

	_make : function(){
		Controller._make.apply(this);
	},

	request : function(request, response){
		let controller = this;
		let item = request.body;

		if (Object.keys(item).length > 0){
			Storage.saveItem('cards', item).then(e => {
				response.send(e);
			}, error => {
				controller.logger.error(error);
				response.send({
					error : true,
					message : error.message
				});
			});
		}
	}

}, Controller).get();
