var request = require('superagent');
var config = require('../config');

module.exports = {
	get: function(url, cb) {
		request.get(config.apiRoot + url)
		.set('Accept', 'application/json')
        .end(function(err, res) {
        	cb(res.body, err);
        });
	}
};
