'use strict'

const express = require('express');
const api = express.Router();
const clientController = require('../clients/clients.controller')
const {ensureAuth , isAdmin} = require('../services/authenticated')

//EMPLOYEE ONLY! CRUD
api.post('/save',clientController.saveClient);

api.get('/gets',clientController.getClient);
api.get('/get/:id',clientController.getClientBy)

api.put('/update/:id',clientController.updateClient);
api.delete('/delete/:id',clientController.deleteClient);

module.exports = api
