module.exports = {
	init: function() {
		this.done = 'test.done';

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
			self.trigger('temp');
		});

		app.on('menu.done', function() {
			// self.trigger('temp');
			app.rest.get('/test', function(data) {
				self.items = data;
				self.update();
				self.trigger('test.done');
			});
		});
		
		// this.counter = 2;
		// this.on('temp', function() {
		// 	this.counter--;
		// 	if(this.counter <= 0) {
		// 		this.counter = 2;
		// 		self.trigger('test.done');
		// 	}
		// });
	},

	tt: function() {
		console.log(2222);
	}
}