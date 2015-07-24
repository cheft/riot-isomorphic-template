module.exports = function(router) {
	router.post('/', function(req, rep) {
		if(req.body.username === 'admin' && req.body.password === 'admin') {
			console.log(req.session, 555);
			req.session.user = {username: 'admin', password: 'admin'};
			return rep.send({result: 'success'});
		}
		return rep.send({result: 'error'});
	});
}