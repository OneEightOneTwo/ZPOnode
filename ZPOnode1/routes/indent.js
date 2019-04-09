var express = require('express');
const db=require('../public/lib/mongodd');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    const {
        gid,
        uid,
        ttprice,
        nus,
        fn
    } = req.body;
    
    // (async() => {

    //     let data = await db.find('indent', {
    //         'uid':uid,
    //         // 'ttprice':ttprice,
    //         // 'nus':nus
    //     });
    //     // console.log(data);
    //     res.send(data);
       
    // })();
    if(fn=="xr"){
     (async() => {
        let data = await db.find('indent', {
            
        });
        // console.log(data);
        res.send(data);
       
    })();
    }

    if(fn=='update'){
        (async()=>{
            let data = await db.update('indent',{
               '_id':gid
            },{
               
                'ttprice':ttprice,
                'nus':nus
            });
            // console.log(data);
            res.send(data);
        })();
    }


});

module.exports = router;