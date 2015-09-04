var mysqlAdapter = require('sails-mysql');
var diskAdapter  = require('sails-disk');

module.exports = {
	adapters: {
	    default: diskAdapter,
	    mysql: mysqlAdapter,
    	disk: diskAdapter
    },
	connections: {
		codingMySql: {
	    	adapter: 'mysql',
	    	host: '10.9.1.188',
	    	database: 'cf_a0fc8251_e5ef_4c32_a8fa_e6fd98b657da',
	    	user: 'NjpqgpQ5t2Gf9noX',
	    	password: 'uGkyuqEHduQHcIi3'
	  	},
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