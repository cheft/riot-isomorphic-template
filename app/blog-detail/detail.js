module.exports = {
    init: function() {
        this.on('mount', function() {
        	if(app.isClient()) window.scrollTo(0, 0);
        });
    },
    holdLink: function(e) {
        app.router.hold(e);
    }
}
