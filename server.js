var fs = require('fs');
var path = require('path');
var riot = require('riot');
var express = require('express');
var app = express();
var router = express.Router();

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

app.engine('html', function (filePath, options, callback) {
    var tagName = filePath.substr(filePath.lastIndexOf(path.sep) + 1).replace('.html', '');
    try {
        var view = riot.render(tagName, options);
        var index = fs.readFileSync(__dirname + '/public/index.html', 'utf8');
        callback(null, index.replace('<div id="app"></div>', '<div id="app">' + view + '</div>'));
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


require('./views/hello.html');
require('./views/test.html');
require('./views/todo.html');

var list = [
    {name: '刘备', position: '主公'},
    {name: '关羽', position: '前将军'},
    {name: '张飞', position: '后将军'},
    {name: '赵云', position: '先锋'},
    {name: '诸葛', position: '军师'},
];

router.get('/', function(req, rep, next) {
    rep.render('hello', {items: list});
});

router.get('/todo', function(req, rep) {
    rep.render('todo');
});

router.get('/server', function(req, rep) {
    rep.render('todo');
});

router.get('/api', function(req, rep) {
    rep.send(list);
});
