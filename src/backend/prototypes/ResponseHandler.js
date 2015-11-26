/**
 * @lends Response.prototype
 */
let ResponseHandler = {

	_response : null,

	/**
	 * The ResponseHandler takes care of sending the controlers response object properly.
	 *
	 * @constructs
	 * @param {ExpressResponse} response
	 */
	_make : function(response) {
		this._response = response;

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
	}

}

export default ResponseHandler;
