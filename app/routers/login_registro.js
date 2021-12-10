const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../../config/sql');
const jwt = require('jsonwebtoken');

//Ruta de login
router.get('/pruebas', (req,res)=>{
    sql= "select * from user";
    mysqlConnection.query(sql,function (err, result) {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

router.post('/login', (req, res)=>{
    const {email,password} = req.body;
    console.log(email);
    console.log(password);
   let sql = "select * from login where email=? and password=?";
   let value =[email,password];
    
   mysqlConnection.query(sql,value, (err,result)=>{
       if(!err){
           res.json(result);
           console.log(result);
            // let data = json.stringify(result[0]);
            // const token = jwt.sign(data,'strong');
            // res.json({token})
       }else{
           res.send(err)
       }
   })





//    mysqlConnection.query('select * from user where user=? and password=?'),[user,password],
//    (err,result)=>{
//        if(!err){
//            if(result.length>0){
            
//            }else{
//                res.json('Usuario o clave incorrecta');
//            }
           
//        }else{
//            res.send(err);
//        }
//    }
})

//Ruta de registro
router.post('/registro', (req,res)=>{
    
})

module.exports = router