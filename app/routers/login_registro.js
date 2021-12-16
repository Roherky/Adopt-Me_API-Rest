const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../../config/sql');

//Ruta de login
router.post('/login', (req, res)=>{
    const {email,password} = req.body;
   let sql = "select * from login where email=? and password=?";
   let value =[email,password];
    
   mysqlConnection.query(sql,value, (err,result)=>{
       console.log(result);
       if(!err){
        if(result.length == 0){
            res.send({mensaje: "incorrecto"});
        }else{
            res.send({mensaje: "correcto", respuesta: result});
        }           
       }else{
           res.send(err)
       }
   })
})

//Ruta de registro
router.post('/registro/protectora', (req, res) => {
        const {nombre, direccion, localidad, telefono, email, password} = req.body;
        let sql = 'INSERT INTO protectora (nombre, direccion, localidad, telefono) VALUES (?,?,?,?)';
        let value = [nombre, direccion, localidad, telefono];
        mysqlConnection.query(sql,value, (err,result)=>{
            if(!err){  
                const id =result.insertId
                            //Consulta para agregar login al ultimo usuario creado
                            let value = [id,email,password];
                            mysqlConnection.query('INSERT INTO login (id_Protectora, email, password) VALUES (?,?,?)',value,(err,res)=>{
                                if(!err){
                                   console.log(res);
                                }else{
                                    console.log(err);
                                }
                            })                     
            }else{
                res.json(err);
            }
        })
})

router.post('/registro/adoptante', (req, res)=>{
        const {nombre, apellidos, fechaNacimiento, telefono, localidad, direccion, email, password} = req.body;
        let sql = 'INSERT INTO adoptante (nombre, apellidos, fechaNacimiento, telefono, localidad, direccion) VALUES (?,?,?,?,?,?)';
        let value =[nombre,apellidos,fechaNacimiento,telefono,localidad,direccion];
        mysqlConnection.query(sql,value, (err,result)=>{
            if(!err){
                const id = result.insertId;
                let value = [id,email,password];
                            mysqlConnection.query('INSERT INTO login (id_Adoptante, email, password) VALUES (?,?,?)',value,(err,res)=>{
                                if(!err){
                                   console.log(res);
                                }else{
                                    console.log(err);
                                }
                            })
            }else{
                res.send(err)
            }
        })
})

module.exports = router
