/**
 * @namespace tec-demo.services
 */

import { Make, hasPrototype } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';
import Card from 'prototypes/Card.js';

/**
 * @module CardService
 */
angular.module('tec-demo.services').factory('CardService', ['$rootScope', function($rootScope) {

    /**
     * @inner
     */
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

    debugger;

    /**
     * @inner
     * @instance {Logger}
     */
    var logger = Make(Logger)('CardService');

    /**
     * saves a card into our card storage.
     *
     * @param {Card} card
     * @return {boolean}
     */
    var saveCard = function(card) {
        if (hasPrototype(card, Card)) {
            cardList.push(card);

            $rootScope.$broadcast('CardServiceListUpdate', cardList);

            return true;
        } else {
            logger.warn('unable to save object which is not of type Card');
        }
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
    var deleteCard = function(card) {

        var cardIndex = cardList.indexOf(card);
        cardList.splice(cardIndex, 1);
        $rootScope.$broadcast('CardServiceListUpdate', cardList);

        return true;
    }

    return {
        saveCard: saveCard,
        getCards: getCards,
        deleteCard: deleteCard,
    }
}]);
