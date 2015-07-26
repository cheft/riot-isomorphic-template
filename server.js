var cookieParser = require('cookie-parser');
var session = require('express-session');
var server = require('./lib/server');
var config = require('./config');
var router = require('./app/router');
var dbconfig = require('./db');

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
// app.use(function (req, rep, next) {
//     var url = req.originalUrl;
//     if (url != '/login' && url != '/api/login' && !req.session.user) {
//         return rep.redirect('/login');
//     }
//     next();
// });

app.start();
