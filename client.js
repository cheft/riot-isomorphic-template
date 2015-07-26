var riot   = require('riot');
var client = require('./lib/client');
var config = require('./config');
var router = require('./app/router');

var app = window.app = client(config, router);

app.render = function(name, model) {
	if(name ===  undefined || name === 'undefined') {
		name = model.params[0];
	}else if(name.indexOf('/') !== -1) {
		var arr = name.split('/');
		name = arr[arr.length - 1];
	}
	var appDiv = document.getElementById('app');
	if(appDiv.getElementsByTagName(name).length === 0) {
		appDiv.setAttribute('riot-tag', name);
	}
    riot.mount(name, model);
};

// :TODO
app.holdLink = function(e) {
	var href;
    if (e.target.localName === 'i') {
        href = e.target.parentElement.pathname;
    }
    app.router.hold(e, href);
};

app.router.links = document.querySelectorAll('.mdl-navigation__link');

app.start();
