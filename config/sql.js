const mysql = require('mysql2');
const mysqlConnection = mysql.createConnection({
    host: 'adopt-me.ccnf3ko9yyj0.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: '12345678',
    database: 'adot-me',
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