import { Make } from '../make.js';

import Server from '../server.js';
import Controller from '../../prototypes/controller.js';

/**
 * @lends MainController.prototype
 */
Server.controller(Make({
	route : '/api/v1/main.json',

	_make : function(){
		console.log(`REGITERED ROUTE FOR ${this.route}`)
	},

	request : function(request, response){
		response.end(JSON.stringify({
			haha : 'content',
			prop : 123
		}));
	}
}, Controller).get());
