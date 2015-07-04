var store = require('superagent');

module.exports = function(app) {

    app.route('/').get(function(req, rep) {
        store.get('http://localhost:3000/api')
        .end(function(err, res) {
            var list = JSON.parse(res.text);
            rep.render('hello', {items: list});
        });
        
    });

    app.route('/todo').get(function(req, rep) {
        rep.render('todo');
    });
}
