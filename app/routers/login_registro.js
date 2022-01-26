const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../../config/sql');

// Endpoint de get ID Login
router.get('/idlogin1', (req, res) => {
    let id = req.query.id;
    let sql = "SELECT id_login FROM login AS l \n\
    INNER JOIN protectora AS p \n\
    ON (l.id_protectora = p.id_Protectora) \n\
    WHERE p.id_Protectora = " + id;
    mysqlConnection.query(sql, function(err, result){
        if(err) console.log(err) + console.log("No hemos podido procesar su solicitud");
        else res.send(result);
    })
})

router.get('/idlogin2', (req, res) => {
    let id = req.query.id;
    let sql = "SELECT id_protectora FROM animal \n\
    WHERE idAnimal = " + id;
    mysqlConnection.query(sql, function(err, result){
        if(err) console.log(err) + console.log("No hemos podido procesar su solicitud");
        else res.send(result);
    })
})

//Endpoint de login
router.post('/login', (req, res) => {
    const {email, password} = req.body;
    let sql = "SELECT * FROM login WHERE email = ? and password = ?";
    let value = [email, password];  
    mysqlConnection.query(sql,value, (err, result) => {
        if(!err){
            if(result.length == 0) {
                res.send({mensaje: "incorrecto"});
            }
            else {
                res.send({mensaje: "correcto", respuesta: result});
            }           
        }
        else {
            res.send(err)
        }
    })
})

//Endpoints de registro
router.post('/registro/protectora', (req, res) => {
    const {nombre, direccion, localidad, telefono, email, password} = req.body;
    let sql = 'INSERT INTO protectora (nombre, direccion, localidad, telefono, email) VALUES (?, ?, ?, ?, ?)';
    let value = [nombre, direccion, localidad, telefono, email, password];
    mysqlConnection.query(sql, value, (err, result) => {
        if(!err){  
            const id = result.insertId;
            let value = [id, email, password];
            mysqlConnection.query('INSERT INTO login (id_Protectora, email, password) VALUES (?, ?, ?)', value, (err, result) => {
            if(!err) res.send({usuario: "protectora", respuesta: result});
            else console.log(err);
            })                     
        }
        else res.json(err);
    })
})

router.post('/registro/adoptante', (req, res) => {
    const {nombre, apellidos, fechaNacimiento, telefono, localidad, direccion, email, password} = req.body;
    let sql = 'INSERT INTO adoptante (nombre, apellidos, fechaNacimiento, telefono, localidad, direccion, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
    let value = [nombre, apellidos, fechaNacimiento, telefono, localidad, direccion, email, password];
    mysqlConnection.query(sql, value, (err, result) => {
        if(!err){
            const id = result.insertId;
            let value = [id, email, password];
            mysqlConnection.query('INSERT INTO login (id_adoptante, email, password) VALUES (?, ?, ?)', value, (err, result) => {
            if(!err) res.send({usuario: "adoptante", respuesta: result});
            else console.log(err);
            })
        }
        else res.json(err);
    })
})

// Endpoint para cambiar contraseña
router.put('/password', (request, response) => {
    let params = [
                    request.body.password,
                    request.body.email
                 ]
    let sql = "UPDATE login SET password = COALESCE (?, password) WHERE email = ?";
    mysqlConnection.query(sql, params, function (err, result){
        if(err) {
            console.log(err);
        }
        else 
        {
            response.send(result);
        }
    })
})

// Endpoint para borrar cuenta
// router.delete("/adoptante", (request, response) => {
//     let id = request.body.id_Adoptante;
//     let sql = "DELETE FROM adoptante WHERE id_Adoptante = " + id;
//     mysqlConnection.query(sql, function(error, resultado){
//         if(!error){
//             sql = "DELETE FROM login WHERE id_adoptante = " + id;
//             mysqlConnection.query(sql2, function(error, resultado){
//                 if(!error) response.send(String(resultado.affectedRows));
//                 else console.log(error) + console.log("No hemos podido procesar su solicitud");
//             })
//         }
//         else console.log(error) + console.log("No hemos podido procesar su solicitud");
//     })
// })

// router.delete("/protectora", (request, response) => {
//     let id = request.body.id_Protectora;
//     let sql = "DELETE FROM protectora WHERE id_Protectora = " + id;
//     mysqlConnection.query(sql, function(error, resultado){
//         if(!error){
//             sql = "DELETE FROM login WHERE id_protectora = " + id;
//             mysqlConnection.query(sql, function(error, resultado){
//                 if(!error) response.send(String(resultado.affectedRows));
//                 else console.log(error) + console.log("No hemos podido procesar su solicitud");
//             })
//         }
//         else console.log(error) + console.log("No hemos podido procesar su solicitud");
//     })
// })

module.exports = router