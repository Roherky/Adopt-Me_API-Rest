const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

// Endpoint de get
routes.get("/finalfeliz", function(request, response){
    let id = request.query.id;
    let sql;
    if (id == null) sql = "SELECT * FROM finalesfelices";
    else sql = "SELECT * FROM finalesfelices WHERE id_finalesfelices = " + id;

    console.log(sql);
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado);
    })
})

// Endpoint de post
routes.post("/finalfeliz", function(request, response){
<<<<<<< HEAD
    const {nombreAnimal,fechaPublicacion,descripcion,imagenes,id_adoptante} = req.body;
    let sql = "INSERT INTO finalesfelices (nombreAnimal, fecha_Publicacion, descripcion, imagenes, id_adoptante) VALUES (?,?,?,?,?);";
    let value = [nombreAnimal,fechaPublicacion,descripcion,imagenes,id_adoptante];
    
    mysqlConnection.query(sql,value, function(error, resultado){
=======
    let nombreAnimal = request.body.nombreAnimal;
    let fecha_Publicacion = request.body.fecha_Publicacion;
    let descripcion = request.body.descripcion;
    let imagenes = request.body.imagenes;
    let sql = "INSERT INTO finalesfelices (nombreAnimal, fecha_Publicacion, descripcion, imagenes)" +
              "VALUES ('" +
              nombreAnimal + "', '" +
              fecha_Publicacion + "', '" +
              descripcion + "', '" +
              imagenes + "')";

    console.log(sql);
    mysqlConnection.query(sql, function(error, resultado){
>>>>>>> prueba1
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else {
            console.log(resultado);
            if(resultado.insertId) response.send(String(resultado.insertId));
            else response.send("-1");
        }
    })
})

module.exports = routes;