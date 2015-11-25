import { Make } from 'modules/make.js';
import Card from 'prototypes/Card.js';
import Logger from 'prototypes/Logger.js';
import CardService from 'services/CardService.js'

angular.module('tec-demo.directives').controller("EditorController", ['$scope', function($scope){

	/**
	 * @inner
	 * @instance {Logger}
	 */
	var logger = Make(Logger)('EditorController');

	/**
	 * saves the current card into the CardService.
	 */
	var saveEditor = function(){
		var card = Make({
			title : this.title,
			content : this.content,
			tags : this.tags
		}, Card).get();

		CardService.saveCard(card);

		this.title = '';
		this.content = '';
		this.tags = [];
	};

	var transformChip = function(chip) {
		logger.log('transform the chip', chip);

		return {
			text : chip
		};
	};

	$scope.editor = {
		title : '',
		content : '',
		tags : [],
		save : saveEditor,
		onTransformChip : transformChip,
	}
}])
