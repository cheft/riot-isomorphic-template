var mysqlAdapter = require('sails-mysql');
var diskAdapter  = require('sails-disk');

module.exports = {
	adapters: {
	    default: diskAdapter,
	    mysql: mysqlAdapter,
    	disk: diskAdapter
    },
	connections: {
	    myLocalMySql: {
	    	adapter: 'mysql',
	    	host: 'localhost',
	    	database: 'demo',
	    	user: 'demo',
	    	password: 'demo'
	  	},
	  	myLocalDisk: {
	    	adapter: 'disk'
	    }
	},
	defaults: {
	    migrate: 'alter'
	}
}