module.exports = function(router) {
	router.get('/', function(req, rep) {
		var links = [
            {name: 'HOME', link: '/'},
            {name: 'Blog', link: '/blog'},
            {name: 'TODO', link: '/todo'},
            {name: 'Hello',  link: '/hello'},
            {name: 'Tab',  link: '/tab/1122'}
        ];
		return rep.send(links);
	});
}
