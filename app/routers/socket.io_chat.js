const express = require('express');
const io  = require('socket.io')(4000);
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

// io.on('connection',(socket) =>{
//     console.log("Usuario Conectado");
//     socket.emit('message','Hola Mundo');
//     socket.on('disconnect',()=>{
//         console.log('usuario desconetado');
//     })
// })

io.on ("connection", function(socket) {
    console.log("Usuario connected",socket.id);
    socket.on("nuevo_menssaje" , function(data) {
        console.log("Client says"),data;
    })
});

module.exports = routes;