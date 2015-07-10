module.exports = {
	init: function() {
		this.done = 'menu.done test.done';

		this.name = '11111';
		var self = this;
		
		this.on('mount', function() {
			if(app.isServer()) {
				return;
			}
			var a = document.getElementById('app');
			console.log('mount');
		});
		
		app.rest.get('/test', function(data) {
			self.items = data;
			self.update();
			app.trigger('test.done');
		});
	},

	tt: function() {
		console.log(2222);
	}
}