var express = require('express');
const db = require('../public/javascripts/goodlist')
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	const {
		ef,
		uid,
		goodid,
		cfname,
		goodname,
		imgsrc,
		content,
		price,
		before,
		stock,
		sellnum,
		uptime,
		downtime
	} = req.body;
	//	res.send(req.body);
	//ef为init的时候初始化查询
	if(ef == 'init') {
		(async() => {
			let data = await db.find('goodlist', {
				'uid': '1'
			});
			//			console.log(data);
			res.send(data);
		})();
	} else if(ef == 'remove') {
		//ef为remove的时候删除某数据
		(async() => {
			let data = await db.remove('goodlist', {
				'goodid': goodid
			});
			res.send(data);
		})();
	} else if(ef == 'count') {
		//ef为count时添加数据
		//先查询 得到库中所有数据
		(async() => {
			let data = await db.find('goodlist', '');
			res.send(data);
		})();
	} else if(ef == 'add') {
		let arr = [{
			uid,
			goodid,
			cfname,
			goodname,
			imgsrc,
			content,
			price,
			before,
			stock,
			sellnum,
			uptime,
			downtime
		}];
		(async() => {
			let data = await db.insert('goodlist', arr);
			res.send(data);
		})();
	}

});

module.exports = router;

