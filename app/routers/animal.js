//Funciona todo

const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

routes.get('/animal',(req, res)=>{
   let sql = "SELECT * FROM animal";

    let nombreAnimal = req.query.nombreAnimal;
    let sexo = req.query.sexo;
    let tipoAnimal = req.query.tipoAnimal;
    let ingreso = req.query.ingreso;
    let idProtec=req.query.idProtec;
    let idAnimal=req.query.idAnimal;

    nombreAnimal = (!nombreAnimal || nombreAnimal==="")? false : nombreAnimal; 
    sexo = (!sexo || sexo==="")? false : sexo;
    tipoAnimal = (!tipoAnimal || tipoAnimal==="")? false : tipoAnimal;
    ingreso = (!ingreso || ingreso==="")? false : ingreso;
    idProtec = (!idProtec || idProtec==="")? false : idProtec;
    idAnimal = (!idAnimal || idAnimal==="")? false : idAnimal;

    console.log(nombreAnimal);
    console.log(sexo);
    console.log(tipoAnimal);
    console.log(ingreso);

    if (nombreAnimal || sexo || tipoAnimal  || ingreso || idProtec || idAnimal) {
   
        sql = sql + " WHERE ";
        if (nombreAnimal) {
            sql = `${sql} nombre='${nombreAnimal}' AND `
        }
        if (sexo) {
            sql = `${sql} sexo='${sexo}' AND `
        }
        if (tipoAnimal) {
            sql = `${sql} tipo_animal='${tipoAnimal}' AND`
        }
        if (ingreso) {
            sql = `${sql} fecha_ingresso='${ingreso}' AND`;
        }
        if(idProtec){
            sql = `${sql} id_protectora='${idProtec}' AND `
        }
        if(idAnimal){
            sql = `${sql} idAnimal='${idAnimal}' AND `
        }
        sql = sql.substring(0, sql.length - 4);

        if(idProtec==false){
            sql = `${sql} AND estado='adopcion'`
        }
    }
    else{
        sql = `${sql} WHERE estado='adopcion'`
    }

    mysqlConnection.query(sql, function (err, result) {

        if (err)
            console.log(err);
        else {
            console.log(result);
            res.send(result);
        }
    }) 
})

routes.post('/animal',(req, res)=>{
    console.log('post')

    let sql="INSERT INTO animal (nombre, raza, sexo, imagen, tipo_animal, estado, fecha_ingresso, descripcion,  id_protectora,tamanyo) VALUES ('" + req.body.nombre +"', '"+
    req.body.raza + "', '"+
    req.body.sexo + "', '"+
    req.body.imagen + "', '"+
    req.body.tipo_animal + "', '"+
    req.body.estado + "', '"+
    req.body.fecha_ingresso + "', '"+
    req.body.descripcion + "', '"+
    req.body.id_protectora + "', '"+
    req.body.tamanyo+ "')";

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
        req.body.descripcion,
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
        "descripcion= COALESCE(?, descripcion) ,"+
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
            if(result.affectedRows==1)
              res.send(String(result.affectedRows));
             else
               res.send("0");
        }
    })
})

module.exports = routes;