module.exports = {
    on: {
        init: function() {
            var self = this;
            self.done = 'detail.done';

            app.rest.get('/blog/' + self.opts.params[0], function(data) {
                self.blog = data;
                self.update();
                app.trigger('detail.done');
            });
        },

        mount: function() {
            console.log(window);
            window.scrollTo(0, 0);
        }
    },
    do: {
        holdLink: function(e) {
            var href;
            if (e.target.localName === 'i') {
                href = e.target.parentElement.pathname;
            }
            app.router.hold(e, href);
        }
    }
}
