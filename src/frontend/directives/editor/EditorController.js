angular.module('tec-demo.directives').controller("EditorController", ['$scope', 'CardService', function($scope, CardService){

	/**
	 * saves the current card into the CardService.
	 */
	var saveEditor = function(){
		CardService.saveCard({
			title : this.title,
			content : this.content,
			tags : this.tags
		});

		this.title = '';
		this.content = '';
		this.tags = [];
	};

	var transformChip = function(chip) {
		console.log('transform the chip', chip);

		return {
			text : chip
		};
	}

	$scope.editor = {
		title : '',
		content : '',
		tags : [],
		save : saveEditor,
		onTransformChip : transformChip,
	}
}])
