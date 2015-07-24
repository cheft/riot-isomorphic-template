var riot   = require('riot');
var client = require('cheft/client');
var config = require('./config');
var router = require('./app/router');

var app = window.app = client(config, router);

app.render = function(name, model) {
	if(name.indexOf('/') !== -1) {
		var arr = name.split('/');
		name = arr[arr.length - 1];
	}
	if(name === 'undefined') {
		name = model.params[0];
	}
	var appDiv = document.getElementById('app');
	if(appDiv.getElementsByTagName(name).length === 0) {
		appDiv.setAttribute('riot-tag', name);
	}
    riot.mount(name, model);
};

app.start();
