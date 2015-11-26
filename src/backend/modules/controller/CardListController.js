import Controller from '../../prototypes/controller.js';

import {
    Make
}
from '../make.js';
import Storage from '../Storage.js';

/**
 * @lends CardListController.prototype
 */
export default Make({
    name: 'CardListController',
    route: '/api/v1/CardList.json',

    _make: function() {
        Controller._make.apply(this);
    },

    request: function(request, response) {
        let controller = this;
        let p = Storage.getCollection('cards');

        p.then(list => {
            controller.logger.log('serving card list!');
            response.send(list);
        });
    }
}, Controller).get();