var fs      = require('fs');
var path    = require('path');
var riot    = require('riot');
var sdom    = require('riot/lib/server/sdom')
var express = require('express');
var cheft   = require('cheft');
var rest    = require('cheft/rest');
var _app    = express();

module.exports = function(config, router) {
    var options = {
        dotfiles: 'ignore',
        etag: false,
        extensions: ['htm', 'html'],
        index: false,
        maxAge: '1d',
        redirect: false,
        setHeaders: function (res, path) {
            res.set('x-timestamp', Date.now())
        }
    };

    _app.use(express.static('public', options));

    require.extensions['.html'] = function(module, filename) {
        var src = riot.compile(fs.readFileSync(filename, 'utf8'))
        module._compile('module.exports = ' + src, filename)
    }

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
                }
            }
        })
    }
    recurse(config.dirname + '/app', './', config.dirname + path.sep + 'app');

    riot.render = function(tagName, opts) {
        var root = document.createElement(tagName);
        var tag = riot.mount(root, opts);
        if(tag && tag[0].chain) {
            return {tag: tag[0], root: root, dom: function(root) {
                return sdom.serialize(root);
            }};
        }else {
            return sdom.serialize(root);
        }
    }
    _app.set('views', path.join(config.dirname, 'app'));
    _app.engine('html', function (filePath, options, callback) {
        console.log(filePath, 2222);
        var tmp = filePath.replace(path.sep + 'index.html', '');
        var tagName = tmp.substr(tmp.lastIndexOf(path.sep) + 1);
        console.log(tagName);
        try {
            var view = riot.render(tagName, options);
            var index = fs.readFileSync(config.dirname + '/public/index.html', 'utf8');
            if(view.tag && view.tag.chain) {
                view.tag.on(view.tag.chain, function() {
                    callback(null, index.replace('<div id="app"></div>', '<div id="app">' + view.dom(view.root) + '</div>'));
                });
            }else {
                callback(null, index.replace('<div id="app"></div>', '<div id="app">' + view + '</div>'));
            }
        } catch (e) {
            console.log("App engine error: ", e, " Filepath: ", filePath);
            console.log(e.stack);
        }
    });
    _app.set('view engine', 'html');

    _app.rest = new rest(config);
    _app.start= function(port) {
        _app.listen(port || 3000, function() {
            console.log('Listening on port %d', port || 3000);
        });
    }
    _app = cheft.extend(_app, cheft);
    return _app;
}