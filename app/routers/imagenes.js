const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

routes.get('/imagenes',(req, res)=>{
    console.log('get imagen');

    let sql;
    var id_animal = req.query.id_animal
    if(id_animal==null)
     sql="SELECT * FROM imagenes";
    else
     sql="SELECT * FROM imagenes WHERE id_animal="+id_animal;

     mysqlConnection.query(sql, function(err, result){

        if(err)
        console.log(err);
        else{
            res.send(result);
        }

    })

})
routes.post('/imagenes',(req, res)=>{
    console.log('post')

    let sql="INSERT INTO imagenes (id_adoptante, id_protectora, id_animal, id_noticia, id_final_feliz, imagen) VALUES ('" +req.body.id_adoptantes +"', '"+
    req.body.id_protectora +"', '"+
    req.body.id_animal +"', '"+
    req.body.id_noticia +"', '"+
    req.body.id_final_feliz +"', '"+
    req.body.imagen+"')";


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

routes.put('/imagenes',(req, res)=>{
    console.log('pull');

    let params=[req.body.id_adoptantes,
        req.body.id_protectora,
        req.body.id_animal,
        req.body.id_noticia,
        req.body.id_final_feliz,
        req.body.imagen,
        req.body.id_imagenes];

        let sql="UPDATE imagenes SET id_adoptantes= COALESCE(?, id_adoptantes) ,"+
        "id_protectora= COALESCE(?, id_protectora) ,"+
        "id_animal= COALESCE(?, id_animal) ,"+
        "id_noticia= COALESCE(?, id_noticia) ,"+
        "id_final_feliz= COALESCE(?, id_final_feliz) ,"+
        "imagen = COALESCE(?, imagen) WHERE id_imagenes=?";  

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

routes.delete('/imagenes',(req, res)=>{
    console.log('delete');
    var id_imagenes= req.body.id_imagenes;
    let sql="DELETE FROM imagenes WHERE id_imagenes="+id_imagenes;
    console.log(id_imagenes)

    mysqlConnection.query(sql, function(err, result){
    
        if(err)
        console.log(err);
        else{
            if(result.affectedRows==1){
            res.send(String(id_imagenes));
            }
           else
           console.log(result)
           
        }
    })
})
module.exports = routes;