import MongoDB from 'mongodb';

import { Make } from './make.js';
import Logger from '../prototypes/Logger.js';

let url = 'mongodb://localhost:27017/TecDemo';
let logger = Make(Logger)('Storage');
let { MongoClient, ObjectId } = MongoDB;

let db = new Promise(function(success, failure){
	MongoClient.connect(url, function(error, db){
		if (error) {
			failure(error);
			return;
		}

		logger.log("connected correctly to MongoDB server.");
		success(db);
	})
});

db.catch(function(e){
	logger.error(e)
})

let Interface =  {
	saveItem : function(collection, item){
		return db.then(db => {
			return new Promise((success, failure) => {
				let key = item._id ? { _id : item._id } : item;

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

	queryItems : function(collection, query, forceList) {
		return db.then(db => {
			let p = new Promise((success, failure) => {
				let list = [];
				let cursor = db.collection(collection).find(query);

				cursor.each((error, doc) => {
					if (error) {
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

	getItem : function(collection, objectId) {
		let query = { _id : objectId };

		return Interface.queryItems(collection, query);
	},

	getCollection : function(collection) {
		logger.log('fetching collection:', collection);
		return Interface.queryItems(collection, null, true);
	}
}

export default Interface;
