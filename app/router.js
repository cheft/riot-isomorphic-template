module.exports = function(router) {
	router.get('/', function(req, rep) {
		return rep.render('messages');
	});

	router.get('/login', function(req, rep) {
		return rep.render('login', {template: 'login.html'});
	});

    router.get('/messages/:id', function(req, rep) {
        return rep.render('message-detail', {params: [req.params.id]});
    });

    router.get('/news/:id', function(req, rep) {
        return rep.render('new-detail', {params: [req.params.id]});
    });

	router.get('/:tagName', function(req, rep) {
		return rep.render(req.params.tagName, {params: [req.params.tagName]});
	});
}
