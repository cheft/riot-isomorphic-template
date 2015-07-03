var riot = require('riot');

riot.tag('test', '<h2>{name}</h2> <button onclick="{tt}">aaaaaaaaaaa</button> <ul> <li each="{parent.opts.items}"> {position} - {name} </li> </ul>', function(opts) {
		this.mixin(require('./'));
	
});