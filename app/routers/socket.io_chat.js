const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

// Endpoints de get
routes.get("/chats/adoptante", function(request, response){
    let id = request.query.id;
    let sql = "SELECT DISTINCT c.id_chat, c.id_login1, c.id_login2, p.nombre FROM chat AS c \n\
    INNER JOIN mensaje AS m \n\
    ON (c.id_chat = m.id_chat) \n\
    INNER JOIN login AS l \n\
    ON (c.id_login2 = l.id_login) \n\
    INNER JOIN protectora AS p \n\
    ON (l.id_protectora = p.id_Protectora) \n\
    WHERE c.id_login1 = " + id;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado) + console.log(resultado);
    })
})

routes.get("/chats/protectora", function(request, response){
    let id = request.query.id;
    let sql = "SELECT DISTINCT c.id_chat, c.id_login1, \n\
    c.id_login2, a.nombre, a.apellidos \n\
    FROM chat AS c \n\
    INNER JOIN mensaje AS m \n\
    ON (c.id_chat = m.id_chat) \n\
    INNER JOIN login AS l \n\
    ON (c.id_login1 = l.id_login) \n\
    INNER JOIN adoptante AS a \n\
    ON (l.id_Adoptante = a.id_Adoptante) \n\
    WHERE c.id_login2 = " + id;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado) + console.log(resultado);
    })
})

routes.get("/chat/login/adoptante", function(request, response){
    let id = request.query.id;
    let sql = "SELECT DISTINCT * FROM chat AS c \n\
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

routes.get("/chat/login/protectora", function(request, response){
    let id = request.query.id;
    let sql = "SELECT DISTINCT * FROM chat AS c \n\
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

routes.get("/idlogin/adoptante", function(request, response){
    let id = request.query.id;
    let sql = "SELECT DISTINCT id_login1 FROM chat \n\
    WHERE id_login2 = " + id;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado) + console.log(resultado); 
    })
})

routes.get("/nombre/protectora", function(request, response){
    let id = request.query.id;
    let sql = "SELECT DISTINCT * FROM chat AS c \n\
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

routes.get("/nombre/adoptante", function(request, response){
    let id = request.query.id;
    let sql = "SELECT DISTINCT * FROM chat AS c \n\
    INNER JOIN login AS l \n\
    ON (c.id_login1 = l.id_login) \n\
    INNER JOIN adoptante AS a \n\
    ON (l.id_adoptante = a.id_adoptante) \n\
    WHERE c.id_login2 = " + id;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado) + console.log(resultado);
    })
})

routes.get("/protectora/id_receptor", function(request, response){
    let sql = "SELECT DISTINCT id_receptor FROM mensaje";
    let id_emisor = request.query.id_emisor;
    let id_chat = request.query.id_chat;
    id_emisor = (!id_emisor || id_emisor === "")? false : id_emisor; 
    id_chat = (!id_chat || id_chat === "")? false : id_chat;

    if (id_emisor || id_chat){
    
        sql = sql + " WHERE ";
        if (id_emisor) {
            sql = `${sql} id_emisor='${id_emisor}' AND `
        }
        if (id_chat) {
            sql = `${sql} id_chat='${id_chat}' AND `
        }
         
        sql = sql.substring(0, sql.length - 4);
    }
 
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado) + console.log(resultado);
    })
})

routes.get("/idreceptor", function(request, response){
    let id = request.query.id;
    let sql = "SELECT DISTINCT id_receptor, id_chat FROM mensaje AS m \n\
    INNER JOIN login AS l \n\
    ON (m.id_emisor = l.id_login) \n\
    WHERE l.id_login = " + id;
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

routes.get('/idchat', (request, response) => {
    let id_login1 = request.query.id_login1;
    let id_login2 = request.query.id_login2;
    let sql = "SELECT id_chat FROM chat \n\
    WHERE id_login1 = " + id_login1 +
    " AND id_login2 = " + id_login2;
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado) + console.log(resultado);
    })
})

// Endpoints de post
routes.post("/chat", function(request, response){
    let {id_chat, id_login1, id_login2, id_mensaje, mensaje} = request.body;
    mensaje = "¡Hola! Me interesa saber más sobre un animal que tenéis en adopción";
    let sql = "INSERT INTO chat (id_chat, id_login1, id_login2) VALUES (?, ?, ?)";
    let value = [id_chat, id_login1, id_login2, id_mensaje, mensaje];
    mysqlConnection.query(sql, value, function(error, resultado){
        if(!error){
            const id = resultado.insertId;
            let value = [id, mensaje, id_login1, id_login2];
            mysqlConnection.query("INSERT INTO mensaje (id_chat, mensaje, id_emisor, id_receptor) \n\
            VALUES (?, ?, ?, ?)", value, function(error, resultado){
                if(!error) response.send({chat: "creado", respuesta: resultado, valor: "hola"}) + console.log(resultado);
                else console.log(error);
            })
        }
        else console.log(error);
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