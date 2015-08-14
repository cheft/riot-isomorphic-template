module.exports = function(model) {
    return {
        doGetOne: function(req, rep) {
            app.models[model].findOne({id: req.params.id}, function(err, data) {
                if(err) {
                    return rep.send(err);
                }
                return rep.send(data);
            });
        },
        doGetAll: function(req, rep) {
            var page = req.query.page;
            var cond = {sort: 'createdAt DESC' };
            if(page) {
                cond.skip = app.config.pageSize * parseInt(page) - app.config.pageSize;
                cond.limit = app.config.pageSize;
            }
            app.models[model].find(cond, function(err, data) {
                if(err) {
                    return rep.send(err);
                }
                return rep.send(data);
            });
        },
        doCount: function(req, rep) {
            app.models[model].find({}, function(err, data) {
                if(err) {
                    return rep.send(err);
                }
                return rep.send({count: data.length});
            });
        },
        doCreate: function(req, rep) {
            app.models[model].create(req.body, function(err, data) {
                if(err) {
                    return rep.send(err);
                }
                return rep.send(data);
            });
        },
        doUpdate: function(req, rep) {
            app.models[model].update({id: req.params.id}, req.body, function(err, data) {
                if(err) {
                    return rep.send(err);
                }
                return rep.send(data);
            });
        },
        doRemove: function(req, rep) {
            app.models[model].destroy({id: req.params.id}, function(err, data) {
                if(err) {
                    return rep.send(err);
                }
                return rep.send(data);
            });
        }
    }
};
