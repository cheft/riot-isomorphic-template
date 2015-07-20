module.exports = function(router) {
	router.get('/', function(req, rep) {
		return rep.render('blog');
	});

	router.get('/blog', function(req, rep) {
		return rep.render('blog');
	});

	router.get('/blog/:id', function(req, rep) {
		return rep.render('blog-detail', {params: [req.params.id]});
	});

	router.get('/todo', function(req, rep) {
		return rep.render('todo');
	});

	router.get('/test', function(req, rep) {
	    return rep.render('test');
	});

	router.get('/tab/:id/:name', function(req, rep) {
		return rep.render('test', {params: [req.params.id, req.params.name]});
	});
}
