module.exports = {
	on: {
		init: function() {
			var self = this;
			self.done = 'test.done';
			console.log('router params:', self.opts.params);
			self.name = 'my name';
						
			app.rest.get('/test', function(data) {
				self.items = data;
				self.update();
				app.trigger('test.done');
			});
		},
		mount: function() {
			var a = document.getElementById('app');
			console.log(a);
		}
	},
	do: {
		tt: function() {
			console.log(2222);
		}
	}
}