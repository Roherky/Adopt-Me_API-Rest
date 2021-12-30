const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

// Endpoints de get
routes.get("/chat", function(request, response){
    let id = request.query.id;
    let sql = "SELECT * FROM chat WHERE id_login1 = " + id + "OR id_login2 = " + id;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado);
    })
})

routes.get("/mensaje", function(request, response){
    let id = request.query.id;
    let sql = "SELECT * FROM mensaje WHERE id_chat = " + id;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado);
    })
})

// Endpoints de post
routes.post("/chat", function(request, response){
    let {id_chat, id_login1, id_login2, id_mensaje, mensaje, id_emisor, id_receptor} = request.body;
    mensaje = "¡Hola! Me interesa saber más sobre un animal que tenéis en adopción";
    let sql = "INSERT INTO chat (id_chat, id_login1, id_login2) VALUES (?, ?, ?)";
    let value = [id_chat, id_login1, id_login2, id_mensaje, mensaje];
    mysqlConnection.query(sql, value, function(error, resultado){
        if(!error){
            const id = resultado.insertId;
            let value = [id, mensaje, id_emisor, id_receptor];
            mysqlConnection.query("INSERT INTO mensaje (id_chat, mensaje, id_emisor, id_receptor) \n\
            VALUES (?, ?, ?, ?)", value, function(error, resultado){
                if(!error) response.send({chat: "creado", respuesta: resultado});
                else console.log(error);
            })
        }
        else resultado.json(error);
    })
})

routes.post("/mensaje", function(request, response){
    let {id_chat, mensaje, id_emisor, id_receptor} = request.body;
    let sql = "INSERT INTO mensaje (id_chat, mensaje, id_emisor, id_receptor) VALUES (?, ?, ?, ?)";
    let value = [id_chat, mensaje, id_emisor, id_receptor];
    mysqlConnection.query(sql, value, function(error, resultado){
        if(!error) response.send({mensaje: "creado", respuesta: resultado});
        else console.log(error);
    })
})

module.exports = routes;