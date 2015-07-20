var MinRouter = require('minrouter');
var cheft     = require('./cheft');
var Rest      = require('./rest');

module.exports = function(config, router) {
	var routes = {};
	var _app = {
		rest: Rest(config),
		get: function(url, cb) {
			var req = {params: {}};
			var rep = {
				render: function(name, model) {
					routes[url] = function() {
						model = model || {};
						if(arguments) {
							model.params = [].slice.apply(arguments);
						}
						_app.render(name, model);
					}
				}
			};
			cb(req, rep);
		},
		start: function() {
			window.onload = function() {
				router(_app);
				_app.router = new MinRouter({routes: routes});
				_app.router.start();
			}
		}
	}
	_app = cheft.extend(_app, cheft);
	cheft.observable(_app);

	_app.mixin = function(tag, obj) {
	    var fn, init, item;
	    init = function() {};
	    if (obj.on) {
	    	init = obj.on.init || function() {};
			fn = function(item) {
				return tag.on(item, obj.on[item]);
			};
			for (item in obj.on) {
				fn(item);
			}
	    }
	    obj.do = obj.do || {};
	    obj.do.init = init;
	    tag.mixin(obj.do);
	};

	return _app;
}