# 变量说明
* col 表明  
* obj,obj2 对象写法  
* arr [{}] 一定要加[],不然会出错
* sort()排序 (排序表里面)  
    1 升序    
    -1 降序   
    用法： sort({字段名:1})       
      
           
# 调用方法
```
(async () => {

    let data = await db.insert('students', [{
        'name': 'lemon',
        'age': '16'
    }]);
    console.log(data);
})();

//右边一定要加引号
```

