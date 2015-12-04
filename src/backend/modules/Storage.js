import MongoDB from 'mongodb';

import { Make } from './make.js';
import Logger from '../prototypes/Logger.js';
import Config from './Config.js'

let url = Config.getDbUrl();
let logger = Make(Logger)('Storage');
let { MongoClient, ObjectId } = MongoDB;

let db = url.then(url => {
    logger.log(url);
    return new Promise((success, failure) => {
        MongoClient.connect(url, function(error, db){
            if (error) {
                failure(error);
                return;
            }

            logger.log("connected correctly to MongoDB server.");
            success(db);
        });
	});
});

db.catch(function(e){
	logger.error(e)
})

let Interface =  {

    /**
     * @param {string} collection
     * @param {Object} item
     * @return {Promise<Object>}
     */
	saveItem : function(collection, item){
		return db.then(db => {
			return new Promise((success, failure) => {
                item._id = ObjectId(item._id);

				let key = item._id ? { _id : item._id } : item;

                logger.log(key);

				db.collection(collection).updateOne(key, item, {
					upsert : true
				}, (error, status) => {
					if (error) {
						failure(error);
					} else {
						console.log(status.result);
						success(status.result);
					}
				});
			});
		});
	},

    /**
     * @param {string} collection
     * @param {Object} item
     * @return {Promise<Object>}
     */
    deleteItem : function(collection, item) {
        return db.then(db => {
			return new Promise((success, failure) => {
                let key = item._id ? { _id : ObjectId(item._id) } : item;

				db.collection(collection).remove(key, (error, status) => {
					if (error) {
						failure(error);
					} else {
						console.log(status.result);
						success(status.result);
					}
				});
			});
		});
    },

    /**
     * @param {string} collection
     * @param {Object} query
     * @param {boolean} [forceList]
     * @return {Promise<Array|Object>}
     */
	queryItems : function(collection, query, forceList=false) {
		return db.then(db => {
			let p = new Promise((success, failure) => {
				let list = [];
				let cursor = db.collection(collection).find(query);

                logger.log('looking for', query);

				cursor.each((error, doc) => {
                    logger.log(error, doc);

					if (error) {
                        logger.error(error);
						failure(error);
					} else if(doc === null) {
						let result = ((list.length > 1 || forceList) ? list : list[0]);

						success(result);
					} else {
						list.push(doc);
					}
				});
			});

			p.catch(e => {
				logger.error(e);
			});

			return p;
		});
	},

    /**
     * @param {string} collection
     * @param {string} objectId
     * @return {Promise<Object>}
     */
	getItem : function(collection, objectId) {
		let query = { _id : objectId };

		return Interface.queryItems(collection, query);
	},

    /**
     * @param {string} collection
     * @return {Promise<Array>}
     */
	getCollection : function(collection) {
		logger.log('fetching collection:', collection);
		return Interface.queryItems(collection, null, true);
	},

    /**
     * @param {string} collection
     * @param {string[]} keys
     * @param {Object} [config]
     * @return {Promise}
     */
    setIndex : function(collection, keys, config={ unique : true }){
        return db.then(db => {
            let index = {};

            keys.forEach(item => {
                index[item] = 1;
            });

            db.collection(collection).createIndex(index, config);
        });
    }
}

export default Interface;
