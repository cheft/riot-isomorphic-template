module.exports = function(router) {
	var blogs = [
		{
			id: '123451',
			title: 'On the road again',
			content: 'Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit. Velit anim eiusmod labore sit amet. Voluptate voluptate irure occaecat deserunt incididunt esse in. Sunt velit aliquip sunt elit ex nulla reprehenderit qui ut eiusmod ipsum do. Duis veniam reprehenderit laborum occaecat id proident nulla veniam. Duis enim deserunt voluptate aute veniam sint pariatur exercitation. Irure mollit est sit labore est deserunt pariatur duis aute laboris cupidatat. Consectetur consequat esse est sit veniam adipisicing ipsum enim irure.Qui ullamco consectetur aute fugiat officia ullamco proident Lorem ad irure. Sint eu ut consectetur ut esse veniam laboris adipisicing aliquip minim anim labore commodo. Incididunt eu enim enim ipsum Lorem commodo tempor duis eu ullamco tempor elit occaecat sit. Culpa eu sit voluptate ullamco ad irure. Anim commodo aliquip cillum ea nostrud commodo id culpa eu irure ut proident. Incididunt cillum excepteur incididunt mollit exercitation fugiat in. Magna irure laborum amet non ullamco aliqua eu. Aliquip adipisicing dolore irure culpa aute enim. Ullamco quis eiusmod ipsum laboris quis qui.Cillum ullamco eu cupidatat excepteur Lorem minim sint quis officia irure irure sint fugiat nostrud. Pariatur Lorem irure excepteur Lorem non irure ea fugiat adipisicing esse nisi ullamco proident sint. Consectetur qui quis cillum occaecat ullamco veniam et Lorem cupidatat pariatur. Labore officia ex aliqua et occaecat velit dolor deserunt minim velit mollit irure. Cillum cupidatat enim officia non velit officia labore. Ut esse nisi voluptate et deserunt enim laborum qui magna sint sunt cillum. Id exercitation labore sint ea labore adipisicing deserunt enim commodo consectetur reprehenderit enim. Est anim nostrud quis non fugiat duis cillum. Aliquip enim officia ad commodo id.',
			timeDiff: '1 days',
			image: '/assets/img/road.jpg'
		},
		{
			id: '123452',
			title: 'Apple Music 的魅力？iOS 8.4发布一周，普及率40%',
			content: '根据 Mixpanel 提供的数据，Apple Music 似乎让很多人都升级至苹果最新的移动操作系统 iOS 8.4。数据显示，在仅仅1周内，iOS 8.4 的升级普及率高达40%。对于小幅升级来说，这次的普及率非常高。相信很多人都想要升级 iOS 8.4 体验 Apple Music。当然，iOS 8.4 普及率数据并没有提到关于 Apple Music 的数据。目前还有很多用户升级至了 iOS 9 测试版，相信如果没有 iOS 9 ，iOS 8.4 的普及率会更高。虽然 Apple Music 是驱动用户升级至 iOS 8.4 的主要原因，但苹果也推出了很多节省升级所需空间的技术，方便用户不再需要整理应用和媒体文件。目前，iOS 8.X 的普及率为84%。',
			timeDiff: '3 days'
		},
		{
			id: '123453',
			title: '缩水还是提升？魅蓝2三版本正式入网',
			content: 'Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit. Velit anim eiusmod labore sit amet. Voluptate voluptate irure occaecat deserunt incididunt esse in. Sunt velit aliquip sunt elit ex nulla reprehenderit qui ut eiusmod ipsum do. Duis veniam reprehenderit laborum occaecat id proident nulla veniam. Duis enim deserunt voluptate aute veniam sint pariatur exercitation. Irure mollit est sit labore est deserunt pariatur duis aute laboris cupidatat. Consectetur consequat esse est sit veniam adipisicing ipsum enim irure.Qui ullamco consectetur aute fugiat officia ullamco proident Lorem ad irure. Sint eu ut consectetur ut esse veniam laboris adipisicing aliquip minim anim labore commodo. Incididunt eu enim enim ipsum Lorem commodo tempor duis eu ullamco tempor elit occaecat sit. Culpa eu sit voluptate ullamco ad irure. Anim commodo aliquip cillum ea nostrud commodo id culpa eu irure ut proident. Incididunt cillum excepteur incididunt mollit exercitation fugiat in. Magna irure laborum amet non ullamco aliqua eu. Aliquip adipisicing dolore irure culpa aute enim. Ullamco quis eiusmod ipsum laboris quis qui.Cillum ullamco eu cupidatat excepteur Lorem minim sint quis officia irure irure sint fugiat nostrud. Pariatur Lorem irure excepteur Lorem non irure ea fugiat adipisicing esse nisi ullamco proident sint. Consectetur qui quis cillum occaecat ullamco veniam et Lorem cupidatat pariatur. Labore officia ex aliqua et occaecat velit dolor deserunt minim velit mollit irure. Cillum cupidatat enim officia non velit officia labore. Ut esse nisi voluptate et deserunt enim laborum qui magna sint sunt cillum. Id exercitation labore sint ea labore adipisicing deserunt enim commodo consectetur reprehenderit enim. Est anim nostrud quis non fugiat duis cillum. Aliquip enim officia ad commodo id.',
			timeDiff: '5 days',
			image: '/assets/img/shopping.jpg'
		},
		{
			id: '123454',
			title: 'On the road again',
			content: '在6月2日推出魅蓝note2后，魅族紧锣密鼓地继续迭代其魅蓝系列，目前三个网络版本的都已全部入网。根据工信部网站的最新入网信息显示，型号 M578U/M/C分别是双4G/移动4G/电信4G三个网络制式版本。该设备采用了魅族一贯的超窄边框设计，正面为最新引入的mBack腰圆实体键。魅蓝2采用5吋720P显示屏，屏幕比例从15:9变成标准的16:9，搭载联发科MT6735四核处理器，内存组合提升到2GB RAM和16GB机身存储，最大支持128GB TF卡扩展，500万+1300万像素摄像头组合，内置2450mAh电池，提供白蓝粉灰四个颜色，整体性能配置相对于一代魅蓝有所提升。至于上市时间，魅蓝2或紧跟刚发布的MX5即将会在8月份发布，价格应该下调到599元。',
			timeDiff: '10 days',
			image: '/assets/img/road.jpg'
		},
		{
			id: '123455',
			title: '小米魅族一家亲 红米Note2谍照神似MX5',
			content: '魅族、华为、360最近都在准备发新机，小米虽然没有正式消息，但关于小米5与红米3/Note2的消息已经满天飞了，其中最让人意外还是红米 Note2，不仅配置强悍，并且将搭配全金属机身与指纹识别等功能，直接用低端机与其他品牌中高端机对抗。然而，红米Note2的谍照曝光之后，对比刚发 布的魅族MX5，大家会发现，这两款手机实在太像了红米Note2未来的某个场景很可能是手持MX5但被问是否是红米Note2，这让魅族MX5还怎么卖?谍照显示这款疑似为红米Note2的手机采用金属机身，边角圆润，与魅族MX5如出一辙，摄像头形状相似，整体形象非常相近，区别在于LED补光灯位置不同，扬声器位置不同，红米Note2的指纹识别模块放在了背后。至于正面，红米很明显还是三大金刚键，MX5则是腰圆与指纹合一的Mback键。另外据此前曝光的魅族，小米将在今年推出两款搭载联发科MT6795方案的手机，红米Note2无疑是其中一款，这样在配置上又与魅族MX5撞车，不过按照红米的价位，配置上会有所缩水，但采用的处理器相同，性能差别不会十分明显。魅族员工自评MX5的感觉是非常流畅，这也说明魅族在与联发科合作多次之后终于渐入佳境，不过红米在一代时就与MTK进行合作，虽然二代转为高通方案，但MIUI比FlymeOS在适配工作方面要领先不少。曝光的疑似红米Note2与魅族MX5之所以相似，很大程度上还是对于全金属机身的处理上，此前包括iPhone6、华为Mate7在内的多款全金属手机都采用和HTC相似的解决办法，在金属背壳上嵌入天线隔断条，这两款手机的做法是将顶部和底部的金属部分去掉，改用相同颜色的塑料材质替代，这样保持了背面整体风格的统一性，不过由于材质的区别，依然能够分别出不同之处。从曝光的照片来看，红米Note2的做工比第一代产品提升不少，但和MX5相比还是显得有些粗糙，也不排除是由于工程机的缘故。魅族在MX4的时候，成功利用价格战打了一个翻身仗，一直对于价格优势非常在意的小米不可能不提防，因此红米Note2或是小米为魅族准备的大杀器，配置相近，外观相近，价格低上一大截，这样魅族MX5后路已断。综上所诉，虽然魅族已经开卖了MX5，但初期供货不足，小米完全不用担心，有足够的时间利用红米来展开一次完美的狙击，在下半年的市场竞争中，虽然魅族先行一步，鹿死谁手还存在极大的变数。',
			timeDiff: '21 days',
			image: '/assets/img/shopping.jpg'
		},
		{
			id: '123456',
			title: '操作更流畅：Windows 10 Mobile Build 10158截图曝光',
			content: '尽管版本号为10149的Windows 10 Mobile版本已经面向Slow Ring用户开放，但是部分幸运的用户可以体验更新的系统版本。据悉微软已经向部分开发合作商提供了版本号为10158的Windows 10 Mobile系统，从目前曝光的截图来看用户界面得到一些明显的细节改善，用户在体验该版本之后分享了该版本所带来了一些改变：● 相比较10149版本更加流畅，反馈更加积极 ● Windows Store移除Beta标签，看起来像是最终版本● Windows Store目前具备透明磁贴● 微软Edge浏览器同样具备透明磁贴● People动态磁贴迎来新的表情● 新版Wallet应用根据XDA论坛爆料，10158版本并不会面向Insider成员（Slow/Fast Ring），该版本只面向开发者（Windows 10 for developer），不过他认为Windows Insider不会获得该版本，但是很快会获得1016x前缀的版本。',
			timeDiff: '1 month',
			image: '/assets/img/road.jpg'
		}
	];

	router.get('/', function(req, rep) {
		var data = [];
		for(var i = 0; i < blogs.length; i++) {
			var row = app.extend({}, blogs[i]);
			row.content = row.content.substr(0, 255);
			data.push(row);
		}
		rep.send(data);
	});

	router.get('/:id', function(req, rep) {
		var id = req.params.id;
		for(var i = 0; i < blogs.length; i++) {
			if(blogs[i].id === id) {
				rep.send(blogs);
			}
		}
	});
}