import { Make, hasPrototype } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';
import Card from 'prototypes/Card.js';
import NetworkService from 'services/NetworkService.js';

let logger = Make(Logger)('CardService');

let CardService = {

    /**
     * stores the cardList Promise
     *
     * @static
     * @type {Promise}
     */
    cardList : NetworkService.apiCall('cardList').then(cardList => {
        return cardList.map(card => {
            return Make(card, Card).get();
        })
    }),
    editCardCallback : null,

    /**
     * saves a card into our card storage.
     *
     * @param {Card} card
     */
    saveCard : function(card) {
        return this.cardList.then(cardList => {
            if (hasPrototype(card, Card)) {
                logger.log('saving card!', card);

                return NetworkService.apiCall('card/save', card).then(dbStatus => {
                    if (dbStatus.upserted) {
                        card._id = dbStatus.upserted[0]._id;
                    }

                    let index = cardList.findIndex(item => card._id === item._id);
                    logger.log(index);
                    if (index < 0) {
                        return cardList.push(card);
                    } else {
                        return cardList.splice(index, 1, card);
                    }
                });
            } else {
                logger.warn('unable to save object which is not of type Card');
                return Promise.reject('unable to save object which is not of type Card');
            }
        });
    },

    /**
     * edits a card
     *
     * @param {Card} card
     */
    editCard : function(card) {
            if (hasPrototype(card, Card)) {
                logger.log('editing card!', card);

                if (this.editCardCallback) {
                  return new Promise ((sucess, failure) => {
                    this.editCardCallback(card, sucess, failure);
                  });
                } else {
                  return Promise.reject("No editCardCallback set");
                }

            } else {
                logger.warn('unable to edit Card');
                return Promise.reject('unable to edit Card');
            }
    },

    /**
     * Accepts a callback which will be called as soon as we want to edit a card
     *
     * @param {function} callback
     */
    onEditCard : function (callback) {
        this.editCardCallback = callback;
    },


    /**
     * deletes a card from our card storage.
     *
     * @param {Card} card
     */
    deleteCard : function(card) {
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
