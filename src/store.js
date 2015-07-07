var request = require('superagent');
var Promise = require('./promise');
var config = require('../config');

module.exports = {
	get: function(url) {
		var p = new Promise();
		request.get(config.apiRoot + url)
		.set('Accept', 'application/json')
        .end(function(err, res) {
        	if(err) {
        		p.reject(err);
        	}
			p.resolve(res.body);            
        });
        return p;
	}
};
