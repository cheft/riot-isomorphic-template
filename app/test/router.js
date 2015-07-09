module.exports = function(router) {
	router.get('/', function(req, rep) {
	    var list = [
	        {name: '刘备', position: '主公'},
	        {name: '关羽', position: '前将军'},
	        {name: '张飞', position: '后将军'},
	        {name: '赵云', position: '先锋'},
	        {name: '诸葛', position: '军师'},
	    ];
	    return rep.send(list);
	});
}
