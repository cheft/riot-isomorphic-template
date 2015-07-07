var store = require('../../src/store');
var c = require('../../src/cheft');

module.exports = {
	init: function() {
		this.chain = 'data';
		this.name = '11111';
		var self = this;
		this.on('mount', function() {
			if(c.isClient()) {
				var a = document.getElementById('app');
				window.tag = this;
			}
			console.log('mount');
		});
		
		store.get('/', function(data) {
			self.items = data;
			self.update();
			self.trigger('data');
		});
	},

	tt: function() {
		console.log(2222);
	}
}