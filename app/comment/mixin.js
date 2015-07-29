module.exports = {
	on: {
		init: function() {
			var self = this;
            self.done = 'comment.done';
            app.rest.get('/comment', function(rep) {
                self.comments = rep;
                self.update();
                app.trigger('comment.done');
                self.trigger('upgrade');
            });
		},
        upgrade: function() {
            setTimeout(function() {
               componentHandler.upgradeAllRegistered(); 
            }, 50);
        }
	}
}