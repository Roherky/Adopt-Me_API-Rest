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
    let direccion = request.body.direccion;
    let imagenPerfil = request.body.imagenPerfil;
    let sql = "INSERT INTO adoptante (nombre, apellidos, fechaNacimiento, telefono, localidad, descripcion, direccion, imagenPerfil)" + "VALUES ('" +
               nombre + "', '" +
               apellidos + "', '" +
               fechaNacimiento + "', '" +
               telefono + "', '" +
               localidad + "', '" +
               descripcion + "', '" +
               direccion + "', '" +
               imagenPerfil + "')";

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
routes.put("/adoptante", function(req, res){
    console.log(req.body);
    let params = [ 
                    req.body.nombre, 
                    req.body.apellidos, 
                    req.body.fechaNacimiento,        
                    req.body.telefono,
                    req.body.localidad,
                    req.body.direccion,
                    req.body.descripcion,
                    req.body.imagenPerfil,
                    req.body.id
                ]
    console.log(params)
    let sql = "UPDATE adoptante SET nombre = COALESCE(?, nombre) , " + 
    "apellidos = COALESCE(?, apellidos) , " + 
    "fechaNacimiento = COALESCE(?, fechaNacimiento) , " + 
    "telefono = COALESCE(?, telefono) , " + 
    "localidad = COALESCE(?, localidad) , " + 
    "direccion = COALESCE(?, direccion) , " + 
    "descripcion = COALESCE(?, descripcion) , " + 
    "imagenPerfil = COALESCE(?, imagenPerfil)  WHERE id_Adoptante = ?";
    console.log(sql);
    mysqlConnection.query(sql, params, function (err, result) {
        if(err) {
            console.log(err);
        }
        else 
        {
            res.send(result);
        }
    })
})

// Endpoint de delete
routes.delete("/adoptante", function(request, response){
    let sql;
    let id = request.body.id_Adoptante;
    sql = "DELETE FROM adoptante WHERE id_Adoptante = " + id;
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