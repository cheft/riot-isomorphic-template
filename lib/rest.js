var request = require('superagent');

module.exports = function(opts) {
	if(!opts.apiRoot) throw 'must apiRoot';
	var contentType = opts.contentType || 'application/x-www-form-urlencoded';

	var common = function(type, url, obj, cb) {
		if(cb === undefined) {
			cb = obj;
			obj = {};
		}
		request[type](opts.apiRoot + url)
		.send(obj)
		.set('Content-Type', contentType)
        .end(function(err, res) {
        	return cb(res.body, err);
        });
	};

	return {
		get: function(url, obj, cb) {
			common('get', url, obj, cb);
		},

		post: function(url, obj, cb) {
			common('post', url, obj, cb);
		},

		put: function(url, obj, cb) {
			common('put', url, obj, cb);
		},

		del: function(url, obj, cb) {
			common('del', url, obj, cb);
		}
	}
};
