var weixin = require('weixin-apis');

module.exports = function(app) {
	weixin.on('textMsg', function(data) {
	    console.log(data);
	    var content = data.content;
	    var msg = {
            toUserName : data.fromUserName,
            fromUserName : data.toUserName,
            msgType : 'text',
            content : '没有匹配到'
        };
        app.models.comment.findOne({keyword: data.content}, function(err, data) {
        	if(!err) {
        		msg.content = data.message;
        	}
        	weixin.sendMsg(msg);
		});
	});
	
	return weixin;
}