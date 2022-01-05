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
const finalesFelices = require('./app/routers/finalesFelices');
const imagenes = require('./app/routers/imagenes');
// Settings
let port = process.env.PORT||300;

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
    return next();
});

app.use(express.static(__dirname + '/'));

//Rutas --
app.use(animal);
app.use(adoptante);
app.use(login_registro);
app.use(chat);
app.use(protectora);
app.use(noticias);
app.use(finalesFelices);
app.use(imagenes);
app.use(chat);

app.listen(port);