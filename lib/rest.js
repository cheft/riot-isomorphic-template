var request = require('superagent');

module.exports = function(opts) {
	if(!opts.apiRoot) throw 'must apiRoot';
	var contentType = opts.contentType === undefined ? 'application/x-www-form-urlencoded' : opts.contentType;
	var processData = opts.processData === undefined ? true : opts.processData;

	var common = function(type, url, obj, cb) {
		if(cb === undefined) {
			cb = obj;
			obj = {};
		}
		var rest = request[type](opts.apiRoot + url).send(obj);
		if(contentType) {
			rest = rest.set('Content-Type', contentType);
		}
		rest.set('Process-Data', processData)
        .end(function(err, res) {
        	return cb(res ? res.body : {}, err);
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
