/**
 * @module server
 */

import Express from 'express';
import Path from 'path';
import Glob from 'glob';

import { hasPrototype } from './make.js';
import Controller from '../prototypes/controller.js';

let app = Express();
let server = null;

var controller = function(controller){
	if (hasPrototype(controller, Controller)) {
		app.route(controller.route).all(controller.request.bind(controller));
	} else {
		throw 'you can\'t register a non Controller object as a controller!';
	}
};

var start = function(port){
	let controlerList = Glob.sync('./dist/backend/**/controller/**/*.js');

	controlerList = (controlerList.length > 0) ? controlerList : Glob.sync('./**/controller/**/*.js');

	controlerList.forEach(function(file) {
		console.log('LOADING CONTROLLER: ', file);
		require(Path.resolve(file));
	});

	server = app.listen(port, function(){
		console.log(`SERVER UP AND RUNNING LISTENING ON ${port}!!`);
	});
}

export default {
	start : start,
	controller : controller
};
