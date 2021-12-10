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

// Endpoint de post
routes.post("/adoptante", function(request, response){
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let fechaNacimiento = request.body.fechaNacimiento;
    let telefono = request.body.telefono;
    let localidad = request.body.localidad;
    let descripcion = request.body.descripcion;
    let dirrecion = request.body.direccion;
    let sql = "INSERT INTO adoptante (nombre, apellidos, fechaNacimiento, telefono, localidad, descripcion, dirrecion)" + "VALUES ('" +
               nombre + "', '" +
               apellidos + "', '" +
               fechaNacimiento + "', '" +
               telefono + "', '" +
               localidad + "', '" +
               descripcion + "', '" +
               dirrecion + "')";

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
    let id = request.body.id_Adoptante;
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let fechaNacimiento = request.body.fechaNacimiento;
    let telefono = request.body.telefono;
    let localidad = request.body.localidad;
    let descripcion = request.body.descripcion;
    let dirrecion = request.body.direccion;
    let params = [nombre, apellidos, fechaNacimiento, telefono,
                  localidad, descripcion, dirrecion, id];
    console.log(request.body);
    sql = "UPDATE adoptante SET nombre = COALESCE (?, nombre), \n\
           apellidos = COALESCE (?, apellidos), \n\
           fechaNacimiento = COALESCE (?, fechaNacimiento), \n\
           telefono = COALESCE (?, telefono), \n\
           localidad = COALESCE (?, localidad), \n\
           descripcion = COALESCE (?, descripcion), \n\
           dirrecion = COALESCE (?, dirrecion) \n\
           WHERE id_adoptante = ?";
    console.log(sql);
    mysqlConnection.query(sql, params, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else {
            if(resultado.affectedRows == 1){
                response.send(String(resultado.affectedRows));
            }
            else console.log(resultado);
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