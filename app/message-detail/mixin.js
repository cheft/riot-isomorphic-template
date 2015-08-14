module.exports = {
    on: {
        init: function() {
            this.trigger('initData');
        },
        initData: function() {
            var self = this;
            self.done = 'message.done';
            app.rest.get('/messages/' + self.opts.params[0], function(rep) {
                self.message = rep;
                self.update();
                app.trigger('message.done');
            });
        }
    }
}