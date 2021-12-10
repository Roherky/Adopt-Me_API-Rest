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
<<<<<<< HEAD
=======
    console.log(email);
    console.log(password);
>>>>>>> prueba1
   let sql = "select * from login where email=? and password=?";
   let value =[email,password];
    
   mysqlConnection.query(sql,value, (err,result)=>{
       if(!err){
<<<<<<< HEAD

        if(result.length == 0){
            res.send("Contraseña  o email incorrecto");
        }else{
            //console.log("Te has logueado correctamente");
            //res.send(result);
             let data = JSON.stringify(result[0]);
            const token = jwt.sign(data,'stil');
            res.send(token)
             console.log(jwt.verify(token,'stil'));
=======
           res.json(result);
           console.log(result);
            // let data = json.stringify(result[0]);
            // const token = jwt.sign(data,'strong');
>>>>>>> prueba1
            // res.json({token})
        }   
            
       }else{
           res.send(err)
       }
   })
})
//Ruta de registro
router.post('/registro', (req,res)=>{
    const{eleccion} = req.body;
    if(eleccion == 'protectora'){
        const {nombre,direccion,localidad,telefono,email,password} = req.body;
        let sql = 'INSERT INTO protectora (nombre, direccion, localidad, telefono) VALUES (?,?,?,?)';
        let value = [nombre,direccion,localidad,telefono];
        mysqlConnection.query(sql,value, (err,result)=>{
            if(!err){  
                const id =result.insertId
                            //Consulta para agregar login al ultimo usuario creado
                            let value = [id,email,password];
                            mysqlConnection.query('INSERT INTO `login` (`id_protectora`, `email`, `password`) VALUES (?,?,?)',value,(err,res)=>{
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
    }
    if(eleccion== 'adoptantes'){
        const {nombre,apellidos,fechaNacimiento,telefono,localidad,dirrecion,email,password} = req.body;
        let sql = 'INSERT INTO `adoptante` (`nombre`, `apellidos`, `fechaNacimiento`, `telefono`, `localidad`,`dirrecion`) VALUES (?,?,?,?,?,?)';
        let value =[nombre,apellidos,fechaNacimiento,telefono,localidad,dirrecion];
        mysqlConnection.query(sql,value, (err,result)=>{
            if(!err){
                const id = result.insertId;
                let value = [id,email,password];
                            mysqlConnection.query('INSERT INTO `login` (`id_adoptante`, `email`, `password`) VALUES (?,?,?)',value,(err,res)=>{
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
    }
})



router.post('/test',verifyToken,(req, res)=>{
    console.log(req.data);
    if(req.data.roleId==='user'){
        console.log("Informacion secreta")
    }
})

//headder Authorization
function verifyToken(req,res,next){
    
    if(!req.headers.authorization) return res.status(401).json('No autorizado guilipollas');
    const token = req.headers.authorization.substring(7);
    console.log(token)

    if(token!==''){
        const content = jwt.verify(token,'stil');
        console.log(content);
        req.data = content;
        next();
    }

}

module.exports = router