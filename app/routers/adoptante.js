//Funciona
const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

// Endpoint de get
routes.get("/adoptante", function(request, response){
    let id = request.query.id;
    let sql;
    if(id == null) sql = "SELECT * FROM adoptante";
    else sql = "SELECT * FROM adoptante WHERE id_adoptante = " + id;

    console.log(sql);
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado);
    })
})

// Endpoint de put
routes.put("/adoptante", function(request, response){
    let sql;
    const {id_Adoptante,nombre,apellidos,fechaNacimiento,telefono,email,password,localidad,descripcion,direccion, imagenPerfil} = request.body;
    let params = [nombre, apellidos, fechaNacimiento, telefono,
                  localidad, descripcion,direccion,id_Adoptante];
    console.log(request.body);
    sql = "UPDATE adoptante SET nombre = COALESCE(?, nombre) , " + 
          "apellidos = COALESCE(?, apellidos) , " + 
          "fechaNacimiento = COALESCE(?, fechaNacimiento) , " + 
          "telefono = COALESCE(?, telefono) , " + 
          "localidad = COALESCE(?, localidad) , " + 
          "descripcion = COALESCE(?, descripcion) , " + 
          "direccion = COALESCE(?, direccion)  WHERE id_Adoptante = ?";
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

// Endpoint de delete
routes.delete("/adoptante", function(request, response){
    let sql;
    let id = request.body.id_adoptante;
    sql = "DELETE FROM adoptante WHERE id_adoptante = " + id;
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