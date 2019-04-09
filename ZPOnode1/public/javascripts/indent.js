function res(docs){
    var indentres = docs.map(function(item){
        return `
        <tr gid="${item._id}">
        <td>${item._id}</td>
        <td>${item.uid}</td>
        <td>${item.uptime}</td>
        <td>${item.goodname}</td>
        <td class="juzhon">
          <span class="jian">-</span>
          <input type="text" class="btnn" value="${item.nus}">
          <span class="jia">+</span>
        </td>
        <td class="price">${item.price}</td>
        <td class="ttprice">${item.ttprice}</td>
        <td>${item.tphone}</td>   
        <td>已付款</td>
      </tr>
     
        `;
    }).join('');
    $('#xuanran').html(indentres);
}


$.ajax({
    type:'post',
    url:'http://localhost:5858/indent',
    data:{
        'fn':'xr'
    }
}).done((docs)=>{
    // console.log(docs);
    res(docs);
});


var num = 1;  
    $('#xuanran').on('click','.jia',function(){
        num = ($(this)).prev().val()*1;
        num++
        if(num>=100){
            num=100; 
        }
        $(this).prev().val(num);//赋值
        var price=($(this)).parent().next().text()*1;
        var prices=price*num;
        ($(this)).parent().next().next().text(prices);
        $.ajax({
            type:'post',
            url:'http://localhost:5858/indent',
            data:{
                
               
            }
        }).done((dade)=>{
            console.log(dade)
        })
    });
    $('#xuanran').on('click','.jian',function(){
        num = ($(this)).next().val()*1;
        num--
        if(num<=1){
            num=1;
        }
        $(this).next().val(num);//赋值
        var price=($(this)).parent().next().text()*1;
        var gi=($(this)).parent().parent().attr('gid');
        // console.log(gi);
        var prices=price*num;
        ($(this)).parent().next().next().text(prices);
        $.ajax({
            type:'post',
            url:'http://localhost:5858/indent',
            data:{
                'gid':gi,
                'ttprice':prices,
                'nus':num,
                'fn':'update'

            }
        }).done((dade)=>{
           console.log(dade)
        })


       
    });