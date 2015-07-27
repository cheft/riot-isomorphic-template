var wxconfig = function(config) {
    app.weixin.configurate(config);
    app.weixin.reflashAccessToken();
};

module.exports = function(router) {
    
    router.get('/', function(req, rep) {
        app.models.setting.findOne({
            username: req.session.user.username
        }, function(err, setting) {
            if(!setting) {
                return rep.send({});
            }
            return rep.send(setting);
        });

    });

    router.post('/', function(req, rep) {
        req.body.username = req.session.user.username;
        app.models.setting.create(req.body, function(err, data) {
            if(err) {
                return rep.send(err);
            }
            var config = {
                app: app,
                token : data.token,
                appid : data.appid,
                secret : data.secret
            }
            wxconfig(config);
            return rep.send(data);
        })
    });

    router.put('/:id', function(req, rep) {
        req.body.username = req.session.user.username;
        app.models.setting.update({
            id: req.params.id
        }, req.body, function(err, data) {
            console.log(data);
            if(err) {
                return rep.send(err);
            }
            var config = {
                app: app,
                token : data.token,
                appid : data.appid,
                secret : data.secret
            }
            wxconfig(config);
            return rep.send(data);
        });

    });
}