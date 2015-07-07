var riot = require('riot');
var routerExp = require('./router');
var MinRouter = require('minrouter');

var app = window.app = {};
app.render = function(name, model) {
	var _app = document.getElementById('app');
	_app.innerHTML = '';
	_app.setAttribute('riot-tag', name);
    riot.mount(name, model || {});
}

var routes = {};
app.route = function(url) {
	var rep = {
		render: function(name, model) {
			routes[url] = function() {
				app.render(name, model);
			}
		}
	}
	return {
		get: function(cb) {
			cb({}, rep);
		}
	}
}

routerExp(app);
window.onload = function() {
	var router = app.router = new MinRouter({routes: routes});
	router.start();
}
