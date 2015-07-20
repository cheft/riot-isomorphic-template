var server = require('cheft/server');
var config = require('./config');
var router = require('./app/router');

var app = root.app = server(config, router);
app.start();
