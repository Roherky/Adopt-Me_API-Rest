const mysql = require('mysql2');
const mysqlConnection = mysql.createConnection({
    host: 'adopt-me.cmnc5bojqrom.eu-west-3.rds.amazonaws.com',
    user: 'root',
    password: '12345678',
    database: 'adopt-me',
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('Conexión a la base de datos completada con éxito');
  }
});

module.exports = mysqlConnection;