var riot   = require('riot');
var client = require('./lib/client');
var config = require('./config');
var router = require('./app/router');

var app = window.app = client(config, router);
app.config = config;

var activeMenu = function(name) {
	var activeMenu = document.querySelector('.sidebar-menu li.active');
    if(activeMenu) {
    	activeMenu.className = '';
    }
    var currentMenu = document.querySelector('.sidebar-menu a[href="/' + name + '"]');
    if(currentMenu) {
    	currentMenu.parentNode.className = 'active';
    }
}

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
    activeMenu(name);
};

app.holdLink = function(e) {
    var href;
    if (e.target.localName !== 'a') {
        href = e.target.parentNode.pathname;
    }
    app.router.hold(e, href);
};

app.back = function(e) {
    app.router.back();
}

app.start();
