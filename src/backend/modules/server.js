/**
 * @module server
 */

import Express from 'express';
import Path from 'path';
import Glob from 'glob';
import bodyParser from 'body-parser';

import { Make, hasPrototype } from './make.js';
import Controller from '../prototypes/controller.js';
import ResponseHandler from '../prototypes/ResponseHandler.js';

let app = Express();

app.use(bodyParser.json());

let server = null;


let controller = function(controller){
	if (hasPrototype(controller, Controller)) {
		controller = Make(controller)();

		let route = app.route(controller.route);

		var handlePostGet = (request, response) => {
			console.log('incomming request for', controller.route);
			controller.request(request, Make(ResponseHandler)(response));
		};

		route.post(handlePostGet);
		route.get(handlePostGet);

		route.options((request, response) => {
			console.log('incomming options request for', controller.route);
			controller.options(request, Make(ResponseHandler)(response));
		});
	} else {
		throw 'you can\'t register a non Controller object as a controller!';
	}
};

/**
 * Loads all the controllers and starts listening on the given port.
 *
 * @param {string} port
 * @return {Promise}
 */
let start = function(port){
	if (!server) {
		let controlerList = Glob.sync('./dist/backend/**/controller/**/*.js');

		controlerList = (controlerList.length > 0) ? controlerList : Glob.sync('./**/controller/**/*.js');

		controlerList.forEach(file => {
			console.log('LOADING CONTROLLER: ', file);
			controller(require(Path.resolve(file)).default);
		});

		server = new Promise(success => {
			let server = app.listen(port, () => {
				console.log(`SERVER UP AND RUNNING LISTENING ON ${port}!!`);
				success(server)
			});
		});
	}

	return server;
}

export default {
	start : start,
	controller : controller
};
