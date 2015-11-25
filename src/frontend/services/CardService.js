/**
 * @namespace tec-demo.services
 */

import { Make, hasPrototype } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';
import Card from 'prototypes/Card.js';

let logger = Make(Logger)('CardService');

/**
 * @module CardService
 */
let CardService = {

    /**
     * @private
     */
    cardList : new Promise(function(success){
        success([]);
    }),

    /**
     * saves a card into our card storage.
     *
     * @param {Card} card
     */
    saveCard : function(card) {
        this.cardList.then(function(cardList) {
            if (hasPrototype(card, Card)) {
                cardList.push(card);
            } else {
                logger.warn('unable to save object which is not of type Card');
            }
        });
    },

      /**
       * deletes a card from our card storage.
       *
       * @param {Card} card
       */
    deleteCard : function(card) {
        this.cardList.then(function(cardList) {
            var cardIndex = cardList.indexOf(card);
            if (cardIndex >= 0){
                cardList.splice(cardIndex, 1);
            } else {
                logger.warn('unable to delete Card that is not in List');
            }
        });
    },
}

export default CardService
