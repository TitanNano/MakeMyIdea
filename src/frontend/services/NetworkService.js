import {
    Make
}
from 'modules/make.js';
import NetworkRequest from 'prototypes/NetworkRequest.js';
import Logger from 'prototypes/Logger.js';

let logger = Make(Logger)('NetworkService');

let NetworkService = {
    _pending: {},

    host: 'localhost:3030',

    /**
     * Creates a new network request to load the given url.
     * If an data object is provided, it will be sent as the POST body.
     *
     * @param {string} url
     * @param {Object} data
     * @return {Promise}
     */
    fetch: function(url, data) {
        let self = this;

        if (!data && this._pending[url]) {
            return this._pending[url];
        }

        let request = Make(NetworkRequest)(url, {});

        if (data) {
            request.body(data);
        }

        let promise = request.send();

        promise.then(() => {
            delete self._pending[url];
        }, () => {
            delete self._pending[url];
        });

        this._pending[url] = promise;

        return promise;
    },

    /**
     * Will build the right url to fetch an API resource.
     *
     * @param {number} version
     * @param {string} resource
     * @return {string}
     */
    _buildApiUrl: function(version, resource) {
        return `http://${this.host}/api/v${version}/${resource}.json`;
    },

    /**
     * apiCall will fetch a resource from the api version 1.
     *
     * @param {string} resource
     * @param {Object} data
     * @return {Promise}
     */
    apiCall: function(resource, data) {
        let url = this._buildApiUrl(1, resource);
        let p = this.fetch(url, data);

        logger.log('API call to ->', url);

        p.catch(e => {
            logger.error(e);
        });

        return p.then(function(data) {
            return new Promise((success, failure) => {
                if (data.error) {
                    failure(data);
                } else {
                    success(data);
                }
            });
        });
    }
};

export default NetworkService;