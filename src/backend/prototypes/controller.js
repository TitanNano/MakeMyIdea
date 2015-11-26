import Logger from './Logger.js';
import { Make } from '../modules/make.js';

/**
 * @lends Controller.prototype
 */
let Controller = {
	name : 'Unnamend Controller',
	route : null,
	logger : null,

	_make : function(){
		this.logger = Make(Logger)(this.name);
		this.logger.log(`REGISTERED ROUTE FOR ${this.route}`);
	},

	request : function(){},

	options : function(request, response){
		response.send();
	}
};

export default Controller;
