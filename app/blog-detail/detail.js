module.exports = {
    init: function() {
        this.on('mount', function() {
            if (app.isClient()) window.scrollTo(0, 0);
        });
        var self = this;
        self.chain = 'detail.data';
        app.rest.get('/blog/' + app.routerParams[0], function(data) {
            self.blog = data;
            self.update();
            app.trigger('detail:data');
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
