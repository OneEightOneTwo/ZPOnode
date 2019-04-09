//layui模块
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

	//监听提交
	//form.on('submit(demo1)', function(data){
	//  layer.alert(JSON.stringify(data.field), {
	//    title: '最终的提交信息'
	//  })
	//  return false;
	//});

	//表单初始赋值
	//form.val('example', {
	//  "username": "贤心" // "name": "value"
	//  ,"password": "123456"
	//  ,"interest": 1
	//  ,"like[write]": true //复选框选中状态
	//  ,"close": true //开关状态
	//  ,"sex": "女"
	//  ,"desc": "我爱 layui"
	//})

});

//文件上传部分
let addpic = document.getElementById('addpic');
let okbtn = document.getElementById('okbtn');
okbtn.onclick = () => {
	//选择单个文件 二进制对象
	//创建ajax对象
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange=()=>{
			//	判断请求状态
		if(xhr.readyState==4&&xhr.status==200){
			console.log(xhr.responseText);
		}
	}
	//建立与服务器连接，设置请求参数
	let typecon=addpic.files[0].name.split('.')[1];
	xhr.open('get',`http://localhost:5858?type=${typecon}`,true);
	
	//设置请求头 并说明内容类型为二进制文件
	 xhr.setRequestHeader('content-type',"application/octet-stream");
	 
	//发送请求体出去
	xhr.send(addpic.files[0]);
}