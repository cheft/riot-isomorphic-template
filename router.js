module.exports = function(app) {
    app.route('/').get(function(req, rep) {
    	rep.render('hello');
    });

    app.route('/todo').get(function(req, rep) {
    	rep.render('todo');
    });

    app.route('/test').get(function(req, rep) {
        rep.render('test');
    });
}
