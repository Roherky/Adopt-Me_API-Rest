const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');
// Get
routes.get("/noticias", function(request, response){
    let id = request.query.id;
    let sql;
    if (id == null) sql = "SELECT * FROM noticias";
    else sql = "SELECT * FROM noticias WHERE id_noticias = " + id;

    console.log(sql);
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado);
    })
})
// Post
routes.post("/noticias", function(request, response){
    let titulo= request.body.titulo;
    let categoria = request.body.categoria;
    let prioridad = request.body.prioridad;
    let fecha_publicacion = request.body.fecha_publicacion;
    let descripcion = request.body.descripcion;
    let imagen = request.body.imagen;
    let id_Protectora = request.body.id_Proctectora;
    let sql = "INSERT INTO finalesfelices (titulo, categoria, prioridad, fecha_publicacion,descripcion, imagen, id_Protectora) " +
              "VALUES ('" + titulo+ "', '" + categoria + "', '"+ prioridad + "', '" + fecha_publicacion + "', '"+ descripcion +
              + "', '"+ id_Protectora + "', '" + imagen + "')";

    console.log(sql);
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else {
            console.log(resultado);
            if(resultado.insertId) response.send(String(resultado.insertId));
            else response.send("-1");
        }
    })
})
// Put
routes.put("/noticias", function(request, response){
    let sql;
    let id = request.body.id;
    let titulo = request.body.titulo;
    let categoria = request.body.categoria;
    let prioridad= request.body.prioridad;
    let fecha_publicacion = request.body.fecha_publicacion;
    let descripcion = request.body.descripcion;
    let imagen= request.body.imagen;
    let id_Proctectora = request.body.localidad;
    let params = [titulo, categoria, prioridad, fecha_publicacion, descripcion, imagen,
                id_Proctectora , id];
    console.log(request.body);
    sql = "UPDATE noticias SET titulo = COALESCE (?, titulo), \n\
           categoria = COALESCE (?, categoria), \n\
           prioridad = COALESCE (?, prioridad), \n\
           fecha_publicacion = COALESCE (?, fecha_publicacion), \n\
           descripcion = COALESCE (?, descripcion), \n\
           imagen = COALESCE (?, imagen), \n\
           id_Proctectora  = COALESCE (?, id_Proctectora ), \n\
           WHERE adoptante.id_adoptante = ?";
    console.log(sql);
    mysqlConnection.query(sql, params, function(error, resultado){
        if(error){
            console.log(error) + console.log("No hemos podido procesar su solicitud");
            response.send("-1");
        }
        else {
            console.log(resultado);
            response.send(resultado);
        }
    })
})
// Delete
routes.delete("/noticias", function(request, response){
    let sql;
    let id = request.body.id;
    sql = "DELETE FROM noticias WHERE noticias.idNoticias = " + id;
    console.log(sql);
    mysqlConnection.query(sql, function(error, resultado){
        if(error){
            console.log(error) + console.log("No hemos podido procesar su solicitud");
            response.send("-1");
        }
        else {
            console.log(resultado);
            response.send(String(resultado));
        }
    })
})
module.exports = routes;