function ajax(){
    $.ajax({
    type: "post",
    url: "http://localhost:5858/us",
    data: {
        fn:'all'
    }

}).done((str)=>{
    // console.log(str);
 
    let html =str.map((item)=>{
      return `<tr>
      <td>${item._id}</td>
      <td>${item.name}</td>
      <td>${item.psw}</td>
      <td><a href="javaScript:;">删除</a></td>
    </tr>`  
    }).join('');
    $('#body').html(html);
});

}
ajax();

//删除
$('#body').on('click','a',function(){
    // console.log($(this));
   let name=$(this).parent().prev().prev().html();
    $.ajax({
        type: "post",
        url: "http://localhost:5858/us",
        data: {
            fn:'del',
            name
        }
    }).done((str)=>{
        // console.log(str);
    });

    $(this).parent().parent().remove()
    alert('删除成功');
})

//点击管理员列表
$('.admin').on('click','dd',function(){
    // console.log($(this).index())
    $('.main').eq($(this).index()).css('display','block').siblings().css('display','none')
})

//添加管理员
$('#bttn').on('click',function(){
    let name=$('#user').val();
    let psw =$('#psww').val();
    $.ajax({
        type: "post",
        url: "http://localhost:5858/us",
        data: {
            name,
            psw,
            fn:'inss'
        }
    }).done(()=>{
      alert('添加成功');
      ajax();
    });
})

//判断管理员
let cooki=cookie.get('gid');
// console.log(cooki)
if(cooki=='1'){
    $('#amdin').remove();
}else if(cooki=='2'){
    
    $('.inset').remove();
}else if(cooki=='3'){
    
}

