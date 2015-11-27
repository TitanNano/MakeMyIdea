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
	var saveEditor = function(card){
		CardService.saveCard(card).then(() => {
            if ($scope.editor.success) {
                $scope.editor.success();
            }
			clearFields();
			$scope.$apply();
		});
	};

	var transformChip = function(chip) {
		logger.log('transform the chip', chip);

		return {
			text : chip
		};
	};

  var clearFields = function () {
    $scope.editor.cancel = null;
    $scope.editor.success = null;
    $scope.editor.card = Make({
      title : '',
      content : '',
		}, Card)();
  }


  CardService.onEditCard((card,success,failure) => {
    $scope.editor.card = card.clone(); 
    $scope.editor.success = success;
    $scope.editor.cancel = function(){
      failure("editing canceled");
    clearFields();
    }
  })


	$scope.editor = {
		title : '',
		content : '',
		tags : [],
		save : saveEditor,
		onTransformChip : transformChip,
    cancel : null,
    card : Make({
	     title : '',
       content : '',
		}, Card)()

	}
}])
