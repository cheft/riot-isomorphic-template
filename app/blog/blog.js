module.exports = {
	init: function() {
		var self = this;
		self.chain = 'server:data';
		app.rest.get('/blog', function(data) {
			self.blogs = data;
			self.update();
			self.trigger('server:data');
		});
	},

	holdLink: function(e) {
		app.router.hold(e);
	}
}