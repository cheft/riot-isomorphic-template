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
    var src = riot.compile(require('fs').readFileSync(filename, 'utf8'))
    module._compile('module.exports = ' + src, filename)
}

app.engine('html', function (filePath, options, callback) {
    var tagName = filePath.substr(filePath.lastIndexOf('/') + 1).replace('.html', '');
    try {
        var view = riot.render(tagName, options);
        callback(null, view);
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

router.get('/', function(req, res, next) {
    res.render('hello', {name: 'test22222'});
});

root.app = app