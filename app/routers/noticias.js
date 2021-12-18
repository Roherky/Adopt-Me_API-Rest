const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');
// Get
routes.get("/noticias", function(request, response){
    let id_Protectora = request.query.id_Protectora;
    let sql;
    if (id_Protectora == null) sql = "SELECT * FROM noticias";
    else sql = "SELECT * FROM noticias WHERE id_Protectora = " + id_Protectora;

    console.log(sql);
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado);
    })
})
// Post
routes.post('/noticias',(req, res)=>{
    console.log(req.body);
    let sql = "INSERT INTO noticias (titular, categoria, prioridad, fecha_publicacion, descripcion, imagen, id_Protectora) " + 
            "VALUES ('" + req.body.titular + "', '" + 
                            req.body.categoria + "', '" +
                            req.body.prioridad + "', '" +
                            req.body.fecha_publicacion + "', '" +
                            req.body.descripcion + "', '" +
                            req.body.imagen + "', '" +
                            req.body.id_Protectora + "')";
    console.log(sql);                      
   mysqlConnection.query(sql, function (err, result) 
    {
        if (err) 
            console.log(err);
        else 
        {
            if (result.insertId)
                res.send(String(result.insertId));
            else
                res.send("-1");
        }
    })
})
// Put
routes.put('/noticias',(req, res)=>{
    console.log(req.body);
    let params = [  
                    req.body.titular, 
                    req.body.categoria, 
                    req.body.prioridad,
                    req.body.fecha_publicacion,
                    req.body.descripcion,
                    req.body.imagen,
                    req.body.id_Protectora,
                    req.body.idNoticias]

    let sql = "UPDATE noticias SET titular = COALESCE(?, titular) , " + 
                "categoria = COALESCE(?, categoria) , " + 
                "prioridad = COALESCE(?, prioridad) , " + 
                "fecha_publicacion = COALESCE(?, fecha_publicacion) , " + 
                "descripcion = COALESCE(?, descripcion) , " + 
                "imagen = COALESCE(?, imagen) , " + 
                "id_Protectora = COALESCE(?, id_Protectora)  WHERE idNoticias = ?";
    console.log(sql); 
    mysqlConnection.query(sql, params,function (err, result) 
    {
        if (err) 
            console.log(err);
        else 
        {
            res.send(result);
        }
    })
})
// Delete
routes.delete('/noticias',(req, res)=>{
     console.log(req.body);
    let sql = "DELETE FROM noticias WHERE idNoticias = '" + req.body.idNoticias + "'";
    console.log(sql); 
    mysqlConnection.query(sql, function (err, result) 
    {
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