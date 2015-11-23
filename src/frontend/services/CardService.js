angular.module('tec-demo.services').factory('CardService', ['$rootScope', function($rootScope) {
    
    var cardList = [{
        title: "Title 1",
        content: "Some Content",
        tags: [{
            text: "tag1"
        }, {
            text: "tag2"
        }]
    }, {
        title: "Title 2",
        content: "Some more Content",
        tags: [{
            text: "tag2"
        }, {
            text: "tag3"
        }]
    }];

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

    /**
     * deletes a card from our card storage.
     *
     * @param {Card} card
     * @return {boolean}
     */
    var del = function(card) {

        var cardIndex = cardList.indexOf(card);
        cardList.splice(cardIndex, 1);
        $rootScope.$broadcast('CardServiceListUpdate', cardList);

        return true;
    }

    return {
        saveCard: save,
        getCards: getCards,
        delCard: del,
    }
}]);
