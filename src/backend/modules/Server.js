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

/**
 * constructs and registers a controller in the server.
 *
 * @param {Controller} controller
 */
let controller = function(controller){
	if (hasPrototype(controller, Controller)) {
		controller = Make(controller)();

		let route = app.route(controller.route);

		var handlePostGet = (request, response) => {
			console.log('incomming request for', controller.route);
			controller.request(request, Make(ResponseHandler)(response, controller.logger));
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
		let controlerList = Glob.sync('./dist/**/controller/**/*.js');

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

/**
 * @param {string} dir
 * @param {string} path
 */
let staticDir = function(dir, path) {
	if (!path) {
		path = dir;
	}

	path = '/' + path;
	dir = Path.resolve(__dirname, '..', dir) + '/';

	console.log('mounting', dir, 'on', path);

	return app.use(path, Express.static(dir));
}

export default {
	start : start,
	controller : controller,
	mount : staticDir,
	use : app.use,
};
