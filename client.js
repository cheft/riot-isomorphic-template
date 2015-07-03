var riot = require('riot');
var store = require('superagent');
var page = require('page');

require('./views/test');
require('./views/hello');
require('./views/todo');

page('/', index);
page('/todo', todo);
page();

function show(name, opts) {
	var app = document.getElementById('app');
	app.innerHTML = '';
    app.appendChild(document.createElement(name));
    riot.mount(name, opts || {});
}

function index(cxt, next) {
	store.get('http://localhost:3000/api')
		.end(function(err, res){
		    var list = JSON.parse(res.text);
		    show('hello', {items: list});
		});	
}

function todo(cxt, next) {
	show('todo');
}
