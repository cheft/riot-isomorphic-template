var cookieParser = require('cookie-parser');
var session = require('express-session');
var server = require('./lib/server');
var config = require('./config');
var router = require('./app/router');
var dbconfig = require('./db');

var app = root.app = server(config, router, dbconfig);
app.config = config;
app.use(cookieParser());
app.set('tz', 'GMT+8');
app.use(session({
    secret: '12345',
    name: 'cheft', // cookie的name，默认connect.sid
    cookie: {
        maxAge: 1800000 // 30分钟
    }, 
    resave: false,
    saveUninitialized: true,
}));

// session拦截
app.use(function (req, rep, next) {
    rep.set('Cache-Control', 'no-cache, no-store');
    var url = req.originalUrl;
    if (url === '/favicon.ico') {
        return rep.send('ico');
    }
    if (url != '/login' && url != '/api/login' && url != '' && url != '/api/login/reset' && !req.session.user) {
        return rep.redirect('/login');
    }
    next();
});

app.start();
// app.start(3001);
