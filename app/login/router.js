var users = [{
    username: 'admin',
    password: 'admin'
}, {
    username: 'guest',
    password: 'guest'
}];

module.exports = function(router) {
    router.get('/initdata', function(req, rep) {
        app.models.user.createEach(users, function(err, data) {
            return rep.send(data);
        });
    });

    router.get('/', function(req, rep) {
        rep.send(req.session.user);
    });

    router.post('/', function(req, rep) {
        app.models.user.find({
            username: req.body.username,
            password: req.body.password
        }, function(err, users) {
            if (users.length > 0) {
                req.session.user = {username: users[0].username, password: users[0].password};
                return rep.send({status: 'success'});
            }
            return rep.send({status: 'error'});
        });

    });

    router.get('/logout', function(req, rep) {
        req.session.user = null;
        rep.redirect('/login');
    });
}
