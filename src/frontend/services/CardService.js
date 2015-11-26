/**
 * @namespace tec-demo.services
 */

import {
    Make, hasPrototype
}
from 'modules/make.js';
import Logger from 'prototypes/Logger.js';
import Card from 'prototypes/Card.js';
import NetworkService from 'services/NetworkService.js';

let logger = Make(Logger)('CardService');

/**
 * @module CardService
 */
let CardService = {

    cardList: NetworkService.apiCall('cardList'),

    /**
     * saves a card into our card storage.
     *
     * @param {Card} card
     */
    saveCard: function(card) {
        return this.cardList.then(cardList => {
            if (hasPrototype(card, Card)) {
                logger.log('saving card!', card);

                return NetworkService.apiCall('card/save', card).then(() => {
                    return cardList.push(card);
                });
            } else {
                logger.warn('unable to save object which is not of type Card');
                return Promise.reject('unable to save object which is not of type Card');
            }
        });
    },

    /**
     * deletes a card from our card storage.
     *
     * @param {Card} card
     */
    deleteCard: function(card) {
        return this.cardList.then(cardList => {
            if (hasPrototype(card, Card)) {
                logger.log('deleting card!', card);

                return NetworkService.apiCall('card/delete', card).then(() => {
                    var cardIndex = cardList.indexOf(card);
                    return cardList.splice(cardIndex, 1);
                });
            } else {
                logger.warn('unable to delete object which is not of type Card');
                return Promise.reject('unable to delete object which is not of type Card');
            }
        });
    },
}

export default CardService;