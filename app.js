const express = require('express');
const app = express();
const mysqlConnection  = require('./config/sql');
const cors = require('cors');
// Routes
const adoptante = require('./app/routers/adoptante');
const animal = require('./app/routers/animal');
const login_registro = require('./app/routers/login_registro');


app.use(cors());
app.use(express.json());

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(animal);
app.use(adoptante);
app.use(login_registro);





// Iniciar Servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor conectándose en el puerto ${app.get('port')}`);
});
