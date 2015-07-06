var riot = require('riot');
var store = require('superagent');
var page = window.page = require('page');
var mapper = require('page.js-express-mapper.js');
var router = require('./router');

mapper({
    renderMethod: function(name, model) {
        var _app = document.getElementById('app');
        _app.setAttribute('riot-tag', name);
	    riot.mount(name, model || {});
    },
    expressAppName: 'app'
});
router(app);
window.onload = page;

// var show = function(name, opts) {
//     var app = document.getElementById('app');
//     app.innerHTML = '';
//     app.appendChild(document.createElement(name));
//     riot.mount(name, opts || {});
// }

// window.onload = function() {
// 	var href = location.href;
// 	var name = href.substr(href.lastIndexOf('/') + 1);
// 	if(name === '') {
// 		name = 'hello';
// 	}
// 	if(name === 'hello') {
// 		store.get('/api')
// 		.end(function(err, res){
// 		    var list = JSON.parse(res.text);
// 		    show('hello', {items: list});
// 		});
// 	}else {
// 		show(name);
// 	}
// }
