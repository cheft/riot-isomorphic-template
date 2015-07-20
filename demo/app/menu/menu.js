module.exports = {
	on: {
		init: function() {
			var self = this;
		    self.done = 'menu.done';
		    self.parent.done = self.parent.done ? self.parent.done + ' menu.done' : 'menu.done';
		    app.rest.get('/menu', function(data) {
		        self.links = data;
		        self.update();
		        app.trigger('menu.done');
		    });
		}
	},
	do: {
	    holdLink: function(e) {
	        app.router.hold(e);
	    }
	}
}