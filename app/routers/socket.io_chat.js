const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

// Endpoints de get
routes.get("/chat", function(request, response){
    let id = request.query.id;
    let sql = "SELECT * FROM chat WHERE id_login1 = " + id + " OR id_login2 = " + id;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado) + console.log(resultado);
    })
})

routes.get("/chat/login1/adoptante", function(request, response){
    let id = request.query.id;
    let sql = "SELECT * FROM chat AS c \n\
    INNER JOIN login AS l \n\
    ON (c.id_login1 = l.id_login) \n\
    INNER JOIN adoptante AS a \n\
    ON (l.id_adoptante = a.id_Adoptante) \n\
    WHERE c.id_login1 = " + id;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado) + console.log(resultado);
    })
})

routes.get("/chat/login2/adoptante", function(request, response){
    let id = request.query.id;
    let sql = "SELECT * FROM chat AS c \n\
    INNER JOIN login AS l \n\
    ON (c.id_login2 = l.id_login) \n\
    INNER JOIN adoptante AS a \n\
    ON (l.id_adoptante = a.id_Adoptante) \n\
    WHERE c.id_login2 = " + id;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado) + console.log(resultado);
    })
})

routes.get("/chat/login1/protectora", function(request, response){
    let id = request.query.id;
    let sql = "SELECT * FROM chat AS c \n\
    INNER JOIN login AS l \n\
    ON (c.id_login1 = l.id_login) \n\
    INNER JOIN protectora AS p \n\
    ON (l.id_protectora = p.id_Protectora) \n\
    WHERE c.id_login1 = " + id;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado) + console.log(resultado);
    })
})

routes.get("/chat/login2/protectora", function(request, response){
    let id = request.query.id;
    let sql = "SELECT * FROM chat AS c \n\
    INNER JOIN login AS l \n\
    ON (c.id_login2 = l.id_login) \n\
    INNER JOIN protectora AS p \n\
    ON (l.id_protectora = p.id_Protectora) \n\
    WHERE c.id_login2 = " + id;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado) + console.log(resultado);
    })
})

routes.get("/mensaje", function(request, response){
    let id = request.query.id;
    let sql = "SELECT * FROM mensaje WHERE id_chat = " + id;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado) + console.log(resultado);
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
                if(!error) response.send({chat: "creado", respuesta: resultado}) + console.log(resultado);
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
        if(!error) response.send({mensaje: "creado", respuesta: resultado}) + console.log(resultado);
        else console.log(error);
    })
})

module.exports = routes;