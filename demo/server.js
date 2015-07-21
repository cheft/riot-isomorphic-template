var server = require('cheft/server');
var config = require('./config');
var router = require('./app/router');
var dbconfig = require('./db');

var app = root.app = server(config, router, dbconfig);
app.start();
