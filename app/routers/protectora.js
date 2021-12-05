const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

routes.get('/messages',(req, res)=>{
    console.log('Use to  routers')
})
routes.post('/messages',(req, res)=>{
    console.log('post')
})

routes.put('/messages',(req, res)=>{
    console.log('pull')
})

routes.delete('/messages',(req, res)=>{
    console.log('delete')
})
module.exports = routes;