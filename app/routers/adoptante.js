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

// Endpoint de post
routes.post("/adoptante", function(request, response){
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let fechaNacimiento = request.body.fechaNacimiento;
    let telefono = request.body.telefono;
    let email = request.body.email;
    let password = request.body.password;
    let localidad = request.body.localidad;
    let direccion = request.body.direccion;
    let imagenPerfil = request.body.imagenPerfil;
    let sql = "INSERT INTO adoptante (nombre, apellidos, fechaNacimiento, telefono, email, \n\
               password, localidad, direccion, imagenPerfil) " + "VALUES \n\
               ('" + nombre + "', '" + apellidos + "', '" + fechaNacimiento + "', '" + telefono +
               "', '" + email + "', '" + password + "', '" + localidad + "', '" + 
               direccion + "', '" + imagenPerfil + "')";

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

// Endpoint de put
routes.put("/adoptante", function(request, response){
    let sql;
    let id = request.body.id_adoptante;
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let fechaNacimiento = request.body.fechaNacimiento;
    let telefono = request.body.telefono;
    let email = request.body.email;
    let password = request.body.password;
    let localidad = request.body.localidad;
    let direccion = request.body.direccion;
    let imagenPerfil = request.body.imagenPerfil;
    let params = [nombre, apellidos, fechaNacimiento, telefono, email, password,
                  localidad, direccion, imagenPerfil, id];
    console.log(request.body);
    sql = "UPDATE adoptante SET nombre = COALESCE (?, nombre), \n\
           apellidos = COALESCE (?, apellidos), \n\
           fechaNacimiento = COALESCE (?, fechaNacimiento), \n\
           telefono = COALESCE (?, telefono), \n\
           email = COALESCE (?, email), \n\
           password = COALESCE (?, password), \n\
           localidad = COALESCE (?, localidad), \n\
           direccion = COALESCE (?, direccion), \n\
           imagenPerfil = COALESCE (?, imagenPerfil) \n\
           WHERE id_adoptante = ?";
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