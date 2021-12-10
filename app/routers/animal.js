//Funciona todo

const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

routes.get('/animal',(req, res)=>{
    console.log('get animal');

    let sql;
    var nombreAnimal = req.query.nombreAnimal
    if(nombreAnimal==null)
     sql="SELECT * FROM animal";
    else
     sql="SELECT * FROM animal WHERE nombre="+nombreAnimal;

     mysqlConnection.query(sql, function(err, result){

        if(err)
        console.log(err);
        else{
            res.send(result);
        }

    })

    
})
routes.post('/animal',(req, res)=>{
    console.log('post')

    let sql="INSERT INTO animal (nombre, raza, sexo, imagen, tipo_animal, estado, fecha_ingresso, descripcion,  id_protectora,tamanyo) VALUES ('" +req.body.nombre +"', '"+
    req.body.raza +"', '"+
    req.body.sexo +"', '"+
    req.body.imagen +"', '"+
    req.body.tipo_animal +"', '"+
    req.body.estado +"', '"+
    req.body.fecha_ingresso +"', '"+
    req.body.descripcion +"', '"+
    req.body.id_protectora +"', '"+
    req.body.tamanyo+"')";


    mysqlConnection.query(sql, function(err, result){

        if(err)
        console.log(err);
        else{

        if(result.insertId)
            res.send(String(result.insertId));
            else
            res.send("-1");
        }
        })
})

routes.put('/animal',(req, res)=>{
    console.log('pull');

    let params=[req.body.nombre,
        req.body.raza,
        req.body.sexo,
        req.body.imagen,
        req.body.tipo_animal,
        req.body.estado,
        req.body.fecha_ingresso,
        req.body.id_protectora,
        req.body.tamanyo,
        req.body.idAnimal];

        let sql="UPDATE animal SET nombre= COALESCE(?, nombre) ,"+
        "raza= COALESCE(?, raza) ,"+
        "sexo= COALESCE(?, sexo) ,"+
        "imagen= COALESCE(?, imagen) ,"+
        "tipo_animal= COALESCE(?, tipo_animal) ,"+
        "estado= COALESCE(?, estado) ,"+
        "fecha_ingresso= COALESCE(?, fecha_ingresso) ,"+
        "id_protectora= COALESCE(?, id_protectora) ,"+
        "tamanyo = COALESCE(?, tamanyo) WHERE idAnimal=?";  

        mysqlConnection.query(sql, params, function(err, result){
    
            if(err)
            console.log(err);
            else{
                if(result.affectedRows==1){
                res.send(String(result.affectedRows));
                }
               else
               console.log(result)
               
            }
        })

})

routes.delete('/animal',(req, res)=>{
    console.log('delete');
    var idAnimal= req.body.idAnimal;
    let sql="DELETE FROM animal WHERE idAnimal="+idAnimal;
    console.log(idAnimal)

    mysqlConnection.query(sql, function(err, result){
    
        if(err)
        console.log(err);
        else{
            if(result.affectedRows==1){
            res.send(String(idAnimal));
            }
           else
           console.log(result)
           
        }
    })
})

module.exports = routes;