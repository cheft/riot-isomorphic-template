module.exports = function(router) {
	router.get('/', function(req, rep) {
		var links = [
            {name: 'HOME', link: '/'},
            {name: 'TODO', link: '/todo'},
            {name: 'Blog', link: '/blog'},
            {name: 'Tab',  link: '/tab/1122'}
        ];
		rep.send(links);
	});
}
