module.exports = function(router) {
	router.post('/', function(req, rep) {
		console.log(req.body);
		if(req.body.username === 'admin' && req.body.password === 'admin') {
			return rep.send({result: 'success'});
		}
		return rep.send({result: 'error'});
	});
}