const mysql = require('mysql2');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'B4l4rt4l3x#12',
    database: 'adot-me',
    // multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('Base datos Conectada');
  }
});

module.exports = mysqlConnection;