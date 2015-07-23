module.exports = {
	on: {
		init: function() {
			var self = this;
			self.done = 'blog.done';
			
			app.rest.get('/blog', function(data) {
				self.blogs = data;
				self.update();
				app.trigger('blog.done');
			});
		}
	},
	do: {
		holdLink: function(e) {
			app.router.hold(e);
		},
		login: function() {
			app.router.go('/admin');
		}
	}
}