var Promise = require('bluebird');

const OPS = [
	'GET',
	'POST',
	'PUT',
	'DELETE'
];

module.exports = function HTTP () {

	this.http = function executeHttpCall (url, method, data, headers) {
		return new Promise (function (resolve, reject) {

			var request = new XMLHttpRequest(),
				type = this.method && OPS.indexOf(this.method.toUpperCase()) < -1 ? this.method.toUpperCase() : OPS[0];
			if (!url || typeof url !== 'string') {
				throw 'Error: first parameter must be URL string';
			}
			request.open(type, url, true);
			request.onreadystatechange = function () {
				if (request.readyState === 4) {
					if (request.status - 400 < 0) {
						// success
						// console.log(request.responseText);
						resolve({
							status: request.status,
							data: request.responseText
						});					
					}
					else {
						// error
						reject({
							status: request.status,
							data: request.responseText
						});
					}
				}
			};
			request.send(data || null);
		});
	}.bind(this);

	this.get = function httpGET (url, data, headers) {
		return this.http(url, OPS[0], data, headers);
	};

	this.post = function httpPOST (url, data, headers) { 
		return this.http(url, OPS[1], data, headers);
	};

	this.parseJSON = function parseResponseJSON (response) {
		try {
			response.data = JSON.parse(response.data);
			return response;
		}
		catch (ex) {
			console.error('JSON parsing failed', ex);
			throw (ex);
		}
	};			





};
