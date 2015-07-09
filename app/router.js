module.exports = function(router) {
	router.get('/', function(req, rep) {
		return rep.render('blog');
	});

	router.get('/todo', function(req, rep) {
		return rep.render('todo');
	});

	router.get('/hello', function(req, rep) {
		return rep.render('hello');
	});

	router.get('/test', function(req, rep) {
	    return rep.render('test');
	});

	router.get('/blog', function(req, rep) {
		return rep.render('blog');
	});

	router.get('/blog/:id', function(req, rep) {
		app.routerParams = [req.params.id];
		return rep.render('blog-detail');
	});

	router.get('/tab/:id', function(req, rep) {
		return rep.render('test');
	});
}
