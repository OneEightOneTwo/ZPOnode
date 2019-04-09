const http = require('http');
const fs = require('fs');
// http req请求 它是一个流
http.createServer((req, res) => {
	//跨域
	req.setHeader('Access-Control-Allow-Origin','*');
	req.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
	let typecon=req.url.split('=')[1];
	console.log(req.url);
    const writeStream = fs.createWriteStream(`abc.${typecon}`);
    
    //把流引到本地的abc.jpg中
    req.pipe(writeStream);
    res.end('ok');
}).listen(5859);