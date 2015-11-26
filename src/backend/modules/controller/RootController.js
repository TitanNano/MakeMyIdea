import Controller from '../../prototypes/controller.js';
import { Make } from '../make.js';

export default Make({

	name : 'RootController',

	route : '/',

	request : function(request, response) {
		response.redirect('/client/');
	}
}, Controller).get();
