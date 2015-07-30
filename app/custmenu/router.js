module.exports = function(router) {
    var d = {"menu":{"button":[{"type":"click","name":"今日歌曲","key":"V1001_TODAY_MUSIC","sub_button":[]},{"type":"click","name":"歌手简介","key":"V1001_TODAY_SINGER","sub_button":[]},{"name":"菜单","sub_button":[{"type":"view","name":"搜索","url":"http://www.soso.com/","sub_button":[]},{"type":"view","name":"视频","url":"http://v.qq.com/","sub_button":[]},{"type":"click","name":"赞一下我们","key":"V1001_GOOD","sub_button":[]}]}]}};

    router.get('/', function(req, rep) {
        app.weixin.getMenu(function(data) {
            rep.send(data);
        });
    });

    router.post('/', function(req, rep) {
    	console.log(req.body.menu);
        app.weixin.createMenu(req.body.menu, function(data) {
            rep.send(data);
        });
    });
};
