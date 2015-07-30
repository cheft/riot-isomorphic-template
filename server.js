var cookieParser = require('cookie-parser');
var session = require('express-session');
var server = require('./lib/server');
var config = require('./config');
var router = require('./app/router');
var dbconfig = require('./db');
var weixinHandle = require('./weixin');

var app = root.app = server(config, router, dbconfig);

app.use(cookieParser());

app.use(session({
    secret: '12345',
    name: 'cheft', // cookie的name，默认connect.sid
    cookie: {
        maxAge: 300000 // 5分钟
    }, 
    resave: false,
    saveUninitialized: true,
}));

// session拦截
app.use(function (req, rep, next) {
    var url = req.originalUrl;
    if (url === '/favicon.ico') {
        return rep.send('ico');
    }
    if(url.indexOf('/api/verify') !== -1) {
        return next();
    }
    if (url != '/login' && url != '/api/login' && url != '' && url != '/api/login/initdata' && !req.session.user) {
        return rep.redirect('/login');
    }
    next();
});

app.weixin = weixinHandle(app);

// 接入验证
app.get('/api/verify', function(req, res) {
    if (app.weixin.checkSignature(req)) {
        res.send(200, req.query.echostr);
    } else {
        res.send(200, 'fail');
    }
});

// Start
app.post('/api/verify', function(req, res) {
    app.weixin.loop(req, res);
});

app.start();
