/**
 * @lends Response.prototype
 */
let ResponseHandler = {

    /**
     * @type {Response}
     */
	_response : null,

    /**
     * @type {Logger}
     */
	logger : null,

	/**
	 * The ResponseHandler takes care of sending the controlers response object properly.
	 *
	 * @constructs
	 * @param {ExpressResponse} response
	 */
	_make : function(response, logger) {
		this._response = response;
		this.logger = logger;

		//default headers
		this.setHeaders({
			'Access-Control-Allow-Origin' : '*',
			'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers' : 'origin, content-type'
		});

		this._response.type('json');
	},

	/**
	 * this will set the given headers for the response
	 *
	 * @param {Object} headers
	 */
	setHeaders : function(headers){
		return this._response.set(headers);
	},

	/**
	 * @param {Object} response
	 * @return {boolean}
	 */
	send : function(response) {
		let data = JSON.stringify(response);

		this._response.end(data);
	},

	/**
	 * redirects a request.
	 *
	 * @param {...*} args
	 */
	redirect : function(path) {
		this.logger.log('redirecting from', this._response.req.url, 'to', path);

		this._response.redirect(path);
		this._response.end();
	}
}

export default ResponseHandler;
