var MinRouter = require('minrouter');
var cheft     = require('cheft');
var Rest      = require('cheft/rest');

module.exports = function(config, router) {
	var routes = {};
	var _app = {
		rest: Rest(config),
		get: function(url, cb) {
			var req = {
				params: {}
			};
			var rep = {
				render: function(name, model) {
					routes[url] = function() {
						if(arguments) _app.routerParams = arguments;
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
	return _app;
}