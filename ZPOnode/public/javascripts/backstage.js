//选项卡初始化
$('#chosecontent>div').css('display', 'none');
$('#chosecontent>div:eq(0)').css('display', 'block');
let uid = "1"; //假数据
//点击选项卡
$('#chosetitle li dd').on('click', function() {
	$('#chosecontent>div').css('display', 'none');
	//	$('#chosecontent>div:eq(0)').css('display','block');
	let chosetitle = $(this).children().html();
	if(chosetitle == '发布商品') {
		$('#addgoodinf').css('display', 'block');
	} else if(chosetitle == '商品列表') {
		$('#goodlist').css('display', 'block');
		//商品列表页面
		//初始化渲染（取出cookie中用户名，查询所有该用户的商品数据并渲染）

		$.ajax({
			type: 'post',
			url: 'http://localhost:5858/goodlist',
			data: {
				'ef': 'init',
				'uid': uid
			}
		}).done((docs) => {
			//	console.log(docs);
			let glres = docs.map((item) => {
				return `<tr>
									<td data-id="${item.goodid}">${item.goodid}</td>
									<td>${item.goodname}</td>
									<td>
										<img src="${item.imgsrc}" alt="" />
									</td>
									<td>${item.content}</td>
									<td>${item.cfname}</td>
									<td>${item.price}</td>
									<td>${item.stock}</td>
									<td>${item.sellnum}</td>
									<td>
										<a class="gooddel" href="javascript:;">删除</a>
									</td>
								</tr>`;
			}).join('');

			$('#goodlist tbody').html(glres);

			//删除商品数据
			$('#goodlist .gooddel').on('click', function() {
				//删除数据库数据
				//获取删除的goodid
				let goodid = $(this).parent().parent().children('td:eq(0)').attr('data-id');
				$.ajax({
						type: 'post',
						url: 'http://localhost:5858/goodlist',
						data: {
							'ef': 'remove',
							'goodid': goodid
						}
					}).done((docs) => {
						console.log(docs);
					})
					//删除该行数据
				$(this).parent().parent().remove()
			})

		});
	}

})

//添加商品数据

//			layui.use('element', function() {
//				var element = layui.element;
//
//			});
layui.use(['form', 'layedit', 'laydate'], function() {
	var form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate;

	//日期
	laydate.render({
		elem: '#date'
	});
	laydate.render({
		elem: '#date1'
	});

	//创建一个编辑器
	var editIndex = layedit.build('LAY_demo_editor');

	//自定义验证规则
	form.verify({
		title: function(value) {
			if(value.length < 5) {
				return '标题至少得5个字符啊';
			}
		},
		pass: [
			/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
		],
		content: function(value) {
			layedit.sync(editIndex);
		}
	});

	//监听指定开关
	form.on('switch(switchTest)', function(data) {
		layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
			offset: '6px'
		});
		layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
	});

});

$('#okbtn').on('click', function() {
	//点击提交后获取数据
	let addname = $('#addname').val();
	let addcontent = $('#addcontent').val();
	let addprice = $('#addprice').val();
	let addbefore = $('#addbefore').val();
	let addcfnames = $('#addcfname .layui-form-checked span');
	let addcfname = '';
	for(var $i = 0; $i < addcfnames.length; $i++) {
		addcfname += (addcfnames[$i].innerHTML + ',');
	}
	addcfname = addcfname.slice(0, -1);
	let addstock = $('#addstock').val();
	let adduptime = $('#adduptime').val();
	let adddowntime = $('#adddowntime').val();
	let addimgsrc = "../images/listgood3.jpg";
	$.ajax({
		type: 'post',
		url: 'http://localhost:5858/goodlist',
		data: {
			'ef': 'count'
		}
	}).done((docs) => {
		let listnum = docs.length * 1 + 1;
		$.ajax({
			type: "post",
			url: "http://localhost:5858/goodlist",
			data: {
				'ef': 'add',
				'uid': uid,
				'cfname': addcfname,
				'goodname': addname,
				'imgsrc': addimgsrc,
				'content': addcontent,
				'price': addprice,
				'before': addbefore,
				'stock': addstock,
				'sellnum': "0",
				'uptime': adduptime,
				'downtime': adddowntime,
				'goodid': listnum
			}
		}).done((docs) => {
			if(docs.result.ok){
				alert('添加成功');
				location.href='http://localhost:5858/html/backstage.html';
			}
		});
	});
})