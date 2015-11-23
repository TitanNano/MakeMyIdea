angular.module('tec-demo.services').factory('CardService', ['$rootScope', function($rootScope){


	var cardList = [
		{
			title:"Test1",
			content:"dasdasdas",
			tags:[
				{
					text:"tag1"
				},

				{
					text:"tag2"
				}
			]
		},
		{
			title:"Test2",
			content:"dgfvnvn",
			tags:[
				{
					text:"tag3"
				},

				{
					text:"tag4"
				}
			]
		}
	];

	/**
	 * saves a card into our card storage.
	 *
	 * @param {Card} card
	 * @return {boolean}
	 */
	var save = function(card) {
		cardList.push(card);

		$rootScope.$broadcast('CardServiceListUpdate', cardList);

		return true;
	}

	/**
	 * returns the list of all cards in our storage.
	 *
	 * @return {CardList}
	 */
	var getCards = function() {
		return cardList;
	}

	return {
		saveCard : save,
		getCards : getCards,
	}
}]);
