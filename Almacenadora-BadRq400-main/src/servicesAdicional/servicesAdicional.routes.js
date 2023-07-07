'use stric'
const express = require('express');
const api = express.Router();
const serviceController = require('./servicesAdicional.controller');

api.get('/get', serviceController.getServices);
api.post('/add', serviceController.createService);
api.put('/update/:id', serviceController.updateService);

module.exports = api;
