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

	router.get('/blog', function(req, rep) {
		rep.render('blog');
	});

	router.get('/blog/:id', function(req, rep) {
		app.routerParams = [req.params.id];
		rep.render('blog-detail');
	});

	router.get('/tab/:id', function(req, rep) {
		rep.render('test');
	});
}
