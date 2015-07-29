module.exports = function(router, model) {
    router.get('/', function(req, rep) {
        app.models[model].find({}, function(err, data) {
            if(err) {
                return rep.send(err);
            }
            return rep.send(data);
        });
    });

    router.post('/', function(req, rep) {
        console.log(model, req.body);
        app.models[model].create(req.body, function(err, data) {
            if(err) {
                return rep.send(err);
            }
            return rep.send(data);
        });
    });

    router.get('/:id', function(req, rep) {
        app.models[model].findOne({id: req.params.id}, function(err, data) {
            if(err) {
                return rep.send(err);
            }
            return rep.send(data);
        });
    });

    router.put('/:id', function(req, rep) {
        app.models[model].update({id: req.params.id}, req.body, function(err, data) {
            if(err) {
                return rep.send(err);
            }
            return rep.send(data);
        });
    });

    router.delete('/:id', function(req, rep) {
        app.models[model].destroy({id: req.params.id}, function(err, data) {
            if(err) {
                return rep.send(err);
            }
            return rep.send(data);
        });
    });
};
