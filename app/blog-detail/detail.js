module.exports = {
    init: function() {
        this.on('mount', function() {
            if (app.isClient()) window.scrollTo(0, 0);
        });
        var self = this;
        self.done = 'detail.done';
        app.rest.get('/blog/' + app.routerParams[0], function(data) {
            self.blog = data;
            self.update();
            app.trigger('detail.done');
        });
    },
    holdLink: function(e) {
        var href;
        if (e.target.localName === 'i') {
            href = e.target.parentElement.pathname;
        }
        app.router.hold(e, href);
    }
}
