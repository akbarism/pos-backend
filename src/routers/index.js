const express = require('express');
require('dotenv').config();
const menu = require('./menu')
const cashier = require('./cashier')
const Router = express.Router();

Router
.use('/menu', menu)
.use('/cashier', cashier)
.get('/', function(req,res){
    res.send('Hello world')
})

module.exports = Router;