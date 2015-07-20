module.exports = function(router) {
	router.get('/', function(req, rep) {
		var links = [
            {name: 'Home', link: '/'},
            {name: 'Todo', link: '/todo'},
            {name: 'Test',  link: '/test'},
            {name: 'mutil',  link: '/tab/id12/name34'}
        ];
		return rep.send(links);
	});
}
