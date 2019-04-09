//加密
let createtoken=(str)=>{ 
const buf=Buffer.from(str,'utf8');
console.log(buf.toString('base64'))
return buf.toString('base64');
}


//解密
let token=(token)=>{
    const buf=Buffer.from(token,'base64');
// console.log(buf.toString('utf8'))
return buf.toString('utf8');
}

module.exports={
    createtoken,
    token
}
