const express = require('express');
const app = express();
const mysqlConnection  = require('./config/sql');
const cors = require ('cors');

// Routes
const adoptante = require('./app/routers/adoptante');
const animal = require('./app/routers/animal');
const login_registro = require('./app/routers/login_registro');
const chat = require('./app/routers/socket.io_chat');
const protectora = require('./app/routers/protectora');
const noticias = require('./app/routers/noticias');
// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
//Rutas --
app.use(animal);
app.use(adoptante);
app.use(login_registro);
app.use(chat);
app.use(protectora);
app.use(noticias);



// Iniciar Servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor en Puerto ${app.get('port')}`);
});
