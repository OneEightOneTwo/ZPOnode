
let isok=false;
//用户名
$('#name').on('blur',()=>{
    let name=$('#name').val();
    $.ajax({
        type: "post",
        url:"http://localhost:5858/us",
        data: {
            name,
            fn:'name'
        },
        success: function (str) {
           if(str){
            alert('用户名已存在');
            isok=false;
           }else{
            isok=true;
           }
        }
    });
})


//验证码
$('.ma').html(ranNum());

$('#ma').on('blur',()=>{
    let vl=$('#ma').val();
    let ma=$('.ma').html().toLowerCase();
    if(vl==ma){
        isok=true;
    }else{
        alert('验证码不正确');
        $('.ma').html(ranNum());
        isok=false;
    }
});

//注册
$('.reg').on('click',()=>{
    let name=$('#name').val();
    let psw=$('#psw').val();
    
  if(isok){
    $.ajax({
        type: "post",
        url: "http://localhost:5858/us",
        data: {
            name,
            psw,
            fn:'inset'
        },
        
    }).done((str)=>{
      let {
          name,
          gid,
     } = str;
     //存cookie
      cookie.set('name',name,{
          path:'/',
          expires:1
      });
      cookie.set('gid',gid,{
        path:'/',
        expires:1
    })
    location.href='../html/backstage.html';
    });
    
    
  }else{
      alert('注册不成功');
  }
})