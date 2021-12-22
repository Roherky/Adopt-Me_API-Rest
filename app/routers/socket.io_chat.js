const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

// Endpoints de get
routes.get("/chat", function(request, response){
    let sql = "SELECT id_login1, id_login2, mensaje \n\
               FROM mensaje AS m \n\
               INNER JOIN chat AS c \n\
               ON (m.id_chat = c.id_chat);"
    let login1 = request.query.login1;
    let login2 = request.query.login2;
    console.log(sql);
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado);
    })
})

// routes.get("/mensaje", function(request, response){
//     let sql = "SELECT mensaje \n\
//                FROM mensaje AS m \n\
//                INNER JOIN ;"
//     let mensaje = request.query.mensaje;
//     console.log(sql);
//     mysqlConnection.query(sql, function(error, resultado){
//         if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
//         else response.send(resultado);
//     })
// })

// Endpoints de post
routes.post("/chat", function(request, response){
    let id_chat = request.body.id_chat;
    let id_login1 = request.body.id_login1;
    let id_login2 = request.body.id_login2;
    let sql = "INSERT INTO chat (id_chat, id_login1, id_login2)" + "VALUES ('" +
               id_chat + "', '" +
               id_login1 + "', '" +
               id_login2 + "')";

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

routes.post("/mensaje", function(request, response){
    let id_mensaje = request.body.id_mensaje;
    let id_chat = request.body.id_chat;
    let mensaje = request.body.mensaje;
    let sql = "INSERT INTO mensaje (id_mensaje, id_chat, mensaje)" + "VALUES ('" +
               id_mensaje + "', '" +
               id_chat + "', '" +
               mensaje + "')";

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