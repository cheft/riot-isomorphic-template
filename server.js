var cookieParser = require('cookie-parser');
var session = require('express-session');
var server = require('./lib/server');
var config = require('./config');
var router = require('./app/router');
var dbconfig = require('./db');

var app = root.app = server(config, router, dbconfig);
app.config = config;

app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// session 拦截
app.use(function (req, rep, next) {
    rep.set('Cache-Control', 'no-cache, no-store');
    var url = req.originalUrl;
    if (url === '/favicon.ico') {
        return rep.send('favicon.ico');
    }
    // if(req.session.user) {
    //     next();
    // }else if(url.indexOf('upload') !== -1) {
    //     next();
    // }else if(url === '/login' || url === '/api/login' || url === '/api/login/reset') {
    //     next();
    // }else {
    //     rep.redirect('/login');
    // }
    next();
});

app.start();
// app.start(3001);
