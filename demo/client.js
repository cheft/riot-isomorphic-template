var riot   = require('riot');
var client = require('cheft/client');
var config = require('./config');
var router = require('./app/router');

var app = window.app = client(config, router);

app.render = function(name, model) {
	var appDiv = document.getElementById('app');
	if(appDiv.getElementsByTagName(name).length === 0) {
		appDiv.setAttribute('riot-tag', name);
	}
    riot.mount(name, model);
};

app.start();
