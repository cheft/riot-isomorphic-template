var fs = require('fs');
var path = require('path');
var riot = require('riot');
var sdom = require('riot/lib/server/sdom')
var express = require('express');
var app = express();
var router = express.Router();
var _router = require('./router');

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

require.extensions['.html'] = function(module, filename) {
    var src = riot.compile(fs.readFileSync(filename, 'utf8'))
    module._compile('module.exports = ' + src, filename)
}

riot.render = function(tagName, opts) {
    var root = document.createElement(tagName);
    var tag = riot.mount(root, opts);
    if(tag && tag[0].promise) {
        return {tag: tag[0], root: root, dom: function(root) {
            return sdom.serialize(root);
        }};
    }else {
        return sdom.serialize(root);
    }
}

app.engine('html', function (filePath, options, callback) {
    var tmp = filePath.replace(path.sep + 'index.html', '');
    var tagName = tmp.substr(tmp.lastIndexOf(path.sep) + 1);
    try {
        var view = riot.render(tagName, options);
        var index = fs.readFileSync(__dirname + '/public/index.html', 'utf8');
        if(view.tag && view.tag.promise) {
            view.tag.promise.then(function() {
                callback(null, index.replace('<div id="app"></div>', '<div id="app">' + view.dom(view.root) + '</div>'));
            })
        }else {
            callback(null, index.replace('<div id="app"></div>', '<div id="app">' + view + '</div>'));
        }
    } catch (e) {
        console.log("App engine error: ", e, " Filepath: ", filePath);
        console.log(e.stack);
    }
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

app.set('view engine', 'html');
app.use(express.static('public', options));
app.use('/', router);

var recurse = function(dir, root) {
    fs.readdirSync(dir).forEach(function(file) {
        var filename = path.join(dir, file), ext;
        if (fs.statSync(filename).isDirectory()) {
            recurse(filename, root);
        } else {
            ext = path.extname(filename);
            if (ext === '.html') {
                filename = path.relative(root, filename)
                filename = path.join(path.dirname(filename), path.basename(filename, ext));
                require('./' + filename.replace(/\\/g, '/'));
            }
        }
    })
}
recurse('./views', './');

_router(app);

router.get('/api', function(req, rep) {
    var list = [
        {name: '刘备', position: '主公'},
        {name: '关羽', position: '前将军'},
        {name: '张飞', position: '后将军'},
        {name: '赵云', position: '先锋'},
        {name: '诸葛', position: '军师'},
    ];
    rep.send(list);
});

