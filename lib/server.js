var fs         = require('fs');
var path       = require('path');
var riot       = require('riot');
var sdom       = require('riot/lib/server/sdom')
var express    = require('express');
var bodyParser = require('body-parser');
var cheft      = require('./cheft');
var rest       = require('./rest');
var Waterline  = require('waterline');
var _app = express(), orm = new Waterline();

module.exports = function(config, router, dbconfig) {
    var options = {
        dotfiles: 'ignore',
        etag: false,
        extensions: ['htm', 'html'],
        index: false,
        maxAge: '1d',
        redirect: false,
        setHeaders: function (res, path) {
            res.set('x-timestamp', Date.now());
        }
    };

    cheft.observable(_app);
    _app.use(bodyParser.urlencoded({ extended: true }));
    _app.use(express.static('public', options));

    require.extensions['.html'] = function(module, filename) {
        var src = riot.compile(fs.readFileSync(filename, 'utf8'))
        module._compile('module.exports = ' + src, filename)
    };

    var recurse = function(dir, root, base) {
        fs.readdirSync(dir).forEach(function(file) {
            var filename = path.join(dir, file), ext;
            if (fs.statSync(filename).isDirectory()) {
                recurse(filename, root, base);
            } else {
                ext = path.extname(filename);
                if (ext === '.html') {
                    filename = path.relative(root, filename)
                    filename = path.join(path.dirname(filename), path.basename(filename, ext));
                    require(config.dirname + path.sep + filename.replace(/\\/g, '/'));
                }else if(file === 'router.js') {
                    var _r = express.Router();
                    require(filename)(_r);
                    var routerDir = filename.replace(base, '').replace(path.sep +　'router.js', '').replace(/\\/g, '/');
                    if(routerDir === '') {
                        _app.use('/', _r);
                    }else {
                        _app.use(config.apiPrefix + routerDir, _r);
                    }
                }else if(file === 'model.js') {
                    var Model = Waterline.Collection.extend(require(filename));
                    orm.loadCollection(Model);
                }
            }
        })
    };

    riot.render = function(tagName, opts) {
        var root = document.createElement(tagName);
        var tag = riot.mount(root, opts);
        if(tag && tag[0].done) {
            return {tag: tag[0], root: root, dom: function(root) {
                return sdom.serialize(root);
            }};
        }else {
            return sdom.serialize(root);
        }
    };

    var appInit = function() {
        recurse(config.dirname + '/app', './', config.dirname + path.sep + 'app');
        _app.set('views', path.join(config.dirname, 'app'));
        _app.engine('html', function (filePath, options, cb) {
            var tmp = filePath.replace(path.sep + 'index.html', '');
            var tagName = tmp.substr(tmp.lastIndexOf(path.sep) + 1);
            try {
                options.template = options.template || 'index.html';
                var view = riot.render(tagName, options);
                var index = fs.readFileSync(config.dirname + '/public/' + options.template, 'utf8');
                if(view.tag && view.tag.done) {
                    _app.chain(view.tag.done, function() {
                        cb(null, index.replace('<div id="app"></div>', '<div id="app">' + view.dom(view.root) + '</div>'));
                    });
                }else {
                    cb(null, index.replace('<div id="app"></div>', '<div id="app">' + view + '</div>'));
                }
            } catch (e) {
                console.log("App engine error: ", e, " Filepath: ", filePath);
                console.log(e.stack);
            }
        });
        _app.set('view engine', 'html');
        _app.rest = new rest(config);
        _app = cheft.extend(_app, cheft);
    };

    _app.mixin = function(tag, obj) {
        var init = function() {};
        if (obj.on) {
            init = obj.on.init || function() {};
        }
        tag.mixin({init: init});
    };

    _app.start = function(port) {
        appInit();
        orm.initialize(dbconfig, function(err, models) {
            if(err) throw err;
            _app.models = models.collections;
            _app.connections = models.connections;
            _app.listen(port || 3000, function() {
                console.log('Listening on port %d', port || 3000);
            });
        });
    };
    
    return _app;
}