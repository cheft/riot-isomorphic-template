module.exports = {
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