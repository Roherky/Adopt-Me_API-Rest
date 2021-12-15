const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

// Endpoint de get
routes.get("/finalfeliz", function(request, response){
    let sql;
    sql = "SELECT * FROM finalesfelices \n\
           ORDER BY fecha_Publicacion ASC;";

    console.log(sql);
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado);
    })
})

// Endpoint de post
routes.post("/finalfeliz", function(request, response){
    let nombreAnimal = request.body.nombreAnimal;
    let fecha_Publicacion = request.body.fecha_Publicacion;
    let descripcion = request.body.descripcion;
    let imagenes = request.body.imagenes;
    let id_adoptante = request.body.id_adoptante;
    let sql = "INSERT INTO finalesfelices (nombreAnimal, fecha_Publicacion, descripcion, imagenes, id_adoptante)" +
              "VALUES ('" +
              nombreAnimal + "', '" +
              fecha_Publicacion + "', '" +
              descripcion + "', '" +
              imagenes + "', '" +
              id_adoptante + "')";

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

module.exports = routes;