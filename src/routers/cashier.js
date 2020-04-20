const express = require('express');
const Router = express.Router();
const cashierController = require('../controller/chasier');

Router
    .get('/', cashierController.getCashier)
    .get('/:id_cashier', cashierController.getCashier)
    .post('/register', cashierController.insertCashier)
    .post('/login', cashierController.login)
    .patch('/:id_cashier', cashierController.updateCashier)
    


module.exports = Router;