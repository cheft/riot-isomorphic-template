module.exports = {
	on: {
		init: function() {
			this.trigger('fetch');
		},
        upgrade: function() {
            setTimeout(function() {
               componentHandler.upgradeAllRegistered(); 
            }, 50);
        },
        update: function() {
            console.log('update');
        },
        fetch: function() {
            var self = this;
            self.done = 'comment.done';
            app.rest.get('/comment', function(rep) {
                self.comments = rep;
                self.update();
                app.trigger('comment.done');
                self.trigger('upgrade');
            });
        }
	},

    do: {
        add: function() {
            this.comment = {};
        },
        edit: function(e) {
            this.comment = e.item;
        },
        save: function (e) {
            var self = this;
            this.comment = {
                keyword: this.keyword.value,
                message: this.message.value
            };

            if(this.id.value === '') {
                app.rest.post('/comment', this.comment, function(rep) {
                    self.trigger('fetch');
                });
            }else {
                app.rest.put('/comment/' + this.id.value, this.comment, function(rep) {
                    self.trigger('fetch');
                });
            }
            e.preventUpdate = true;
            return true;
        },
        remove: function(e) {
            var self = this;
            app.rest.del('/comment/' + e.item.id, function(rep) {
                self.trigger('fetch');
            });
        }
    }
}