var store = require('../../src/store');
var c = require('../../src/cheft');

module.exports = {
	init: function() {
		console.log('init');
		this.name = '11111';
		var self = this;
		this.on('mount', function() {
			if(c.isClient()) {
				var a = document.getElementById('app');
				window.tag = this;
			}
			console.log('mount');
		});
		
		this.promise = store.get('/');
		this.promise.then(function(data) {
			self.items = data;
			self.update();
		})
	},

	tt: function() {
		console.log(2222);
	}
}