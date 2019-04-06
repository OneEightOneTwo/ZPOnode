//登录
$('#login').on('click',()=>{
    let name=$('#name').val();
    let psw=$('#psw').val();
    $.ajax({
        type: "post",
        url: "http://localhost:5858/us",
        data: {
            name,
            psw,
            fn:'np'
        },

    }).done((str)=>{
      if(str){
          //存cookie
        cookie.set('name',name,{
            path:'/',
            expires:1
        });

        //判断用户
        let {gid}=str;
        if(gid==1){
            //普通用户

            cookie.set('gid',gid,{
                path:'/',
                expires:1
            });
        }else if(gid==2){
            //管理员

            cookie.set('gid',gid,{
                path:'/',
                expires:1
            });

        }else if(gid==3){
            //超级管理员
            cookie.set('gid',gid,{
                path:'/',
                expires:1
            });
        }
        location.href='../html/backstage.html'
      }else{
          alert('用户名或密码不正确');
      }
     
    });
})

//注册
$('#reg').on('click',()=>{
   location.href='../html/reg.html';
})