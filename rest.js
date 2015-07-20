var request = require('superagent');

module.exports = function(opts) {
	if(!opts.apiRoot) throw 'must apiRoot';
	var accept = opts.accept || 'application/json';

	return {
		get: function(url, cb) {
			request.get(opts.apiRoot + url)
			.set('Accept', accept)
	        .end(function(err, res) {
	        	return cb(res.body, err);
	        });
		},
		post: function() {

		},

		put: function() {

		},

		del: function() {

		}
	}
};
