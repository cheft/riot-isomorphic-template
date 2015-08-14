var fs = require('fs');
var path = require('path')
var multipart = require('connect-multiparty');
var handle = require('../../lib/handle')('news');

var delFile = function(newsId) {
    app.models.news.findOne({id: newsId}, function(err, data) {
        if(err) {
            return rep.send(err);
        }
        if(!data.cover) {
            return;
        }
        fs.unlink(app.config.uploadDir + '/' + data.timestamp + '/' + data.cover, function() {
            fs.rmdir(app.config.uploadDir + '/' + data.timestamp);
        });
    });
}

var upload = function(req, rep) {
    var filename = req.files.cover.originalFilename || path.basename(req.files.cover.path);
    if(filename.indexOf('.') === -1) {
        return;
    }
    if(req.body.id) {
        delFile(req.body.id);
    }
    var timestamp = Date.parse(new Date());
    fs.mkdirSync(app.config.uploadDir + '/' + timestamp);
    var targetPath = app.config.uploadDir + '/' + timestamp + '/' + filename;
    fs.createReadStream(req.files.cover.path).pipe(fs.createWriteStream(targetPath));
    req.body.cover = filename;
    req.body.timestamp = timestamp;
}

module.exports = function(router) {
    
    router.get('/count', function(req, rep) {
        handle.doCount(req, rep);
    });

    router.get('/:id', function(req, rep) {
        handle.doGetOne(req, rep);
    });

    router.get('/', function(req, rep) {
        var page = req.query.page;
        var cond = {sort: {status: 1, createdAt: 0}};
        if(page) {
            cond.skip = app.config.pageSize * parseInt(page) - app.config.pageSize;
            cond.limit = app.config.pageSize;
        }
        app.models.news.find(cond, function(err, data) {
            if(err) {
                return rep.send(err);
            }
            return rep.send(data);
        });
    });

    router.post('/', multipart(), function(req, rep) {
        upload(req, rep);
        req.body.status = 'unpublish';
        if(req.body.id) {
            req.params.id = req.body.id;
            delete req.body.id;
            return handle.doUpdate(req, rep);
        }
        return handle.doCreate(req, rep);
    });

    router.delete('/:id', function(req, rep) {
        delFile(req.params.id);
        handle.doRemove(req, rep);
    });

    router.put('/:id/publish', function(req, rep) {
        app.models.news.find({status: 'publish'}, function(err, data) {
            if(err) {
                return rep.send(err);
            }
            if(data && data.length > 3) {
                return rep.send({error: 'only publish four news. please unpublish other news.'})
            }
            app.models.news.update({id: req.params.id}, {status: 'publish'}, function(err, data) {
                if(err) {
                    return rep.send(err);
                }
                return rep.send(data);
            });
        });
    });

    router.put('/:id/unpublish', function(req, rep) {
        app.models.news.update({id: req.params.id}, {status: 'unpublish'}, function(err, data) {
            if(err) {
                return rep.send(err);
            }
            return rep.send(data);
        });
    });
};
