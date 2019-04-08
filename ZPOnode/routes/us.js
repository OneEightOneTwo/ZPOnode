var express = require('express');
const db=require('../public/lib/mongod');
//加密
const {createtoken}=require('../public/javascripts/token');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    //接收客户端传来的数值
const {
  name,
  psw,
  fn  //判断
}=req.body;
// console.log(name);




//判断用户名和密码
if(fn=='np'){
//加密
let tokenName= createtoken(name);
  (async () => {

  let data = await db.find('login', {
      name:tokenName,
      psw
      
  });
res.send(data[0]);
})();

}
 //判断用户名是否存在
if(fn=='name'){
  //加密
let tokenName= createtoken(name);
  (async () => {
     
      let data = await db.find('login', {
          name:tokenName
          
      });
      
  res.send(data[0]);
  // console.log(data);
  })();
}

 //注册成功添加到数据库
 if(fn=='inset'){
  //加密
let tokenName= createtoken(name);
  (async () => {
 
      let data = await db.insert('login', [{
          name:tokenName,
          psw,
          gid:'1'
          
      }]);
     
  res.send(data.ops[0]);
  // console.log(data.ops[0])
  })();
}
//查询整个表
if(fn=='all'){
  (async () => {
      let data = await db.find('login', {});
  res.send(data);
  // console.log(data);
  })();
}

 //删除
 if(fn=='del'){
  (async () => {
      let data = await db.del('login', {
        name
      });
  
  // console.log(data);
  })();
}

//添加管理员
if(fn=='inss'){
  let tokenName= createtoken(name);
  (async () => {
    let data = await db.insert('login', [{
      name:tokenName,
      psw,
      gid:'2'
      
  }]);
 
res.send(data.ops[0]);
  // console.log(data);
  })();
}

});


module.exports = router;
