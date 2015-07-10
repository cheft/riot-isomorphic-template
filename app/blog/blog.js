module.exports = {
	init: function() {
		var self = this;
		self.done = 'blog:done';
		app.rest.get('/blog', function(data) {
			self.blogs = data;
			self.update();
			app.trigger('blog:done');
		});
	},

	holdLink: function(e) {
		app.router.hold(e);
	}
}