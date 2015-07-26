module.exports = function(router) {
	router.get('/', function(req, rep) {
		return rep.render('dashboard');
	});

	router.get('/login', function(req, rep) {
		return rep.render('login', {template: 'login.html'});
	});

	router.get('/:tagName', function(req, rep) {
		return rep.render(req.params.tagName, {params: [req.params.tagName]});
	});
}
