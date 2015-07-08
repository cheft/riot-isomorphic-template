module.exports = function(router) {
	router.get('/', function(req, rep) {
		rep.render('hello');
	});

	router.get('/todo', function(req, rep) {
		rep.render('todo');
	});

	router.get('/test', function(req, rep) {
	    rep.render('test');
	});

	router.get('/tab/:id', function(req, rep) {
		rep.render('test');
	})
}
