'use strict'

const express = require('express');
const api = express.Router();
const arrendamientoController = require('../arrendamiento/arrendamiento.controller');

api.get('/test', arrendamientoController.test);

api.post('/addArrenda', arrendamientoController.createArrendamiento);
api.get('/verArrenda', arrendamientoController.getArrendamientos);
api.put('/updateArrenda/:id', arrendamientoController.updateArrendamiento);
api.delete('/deletedArrenda/:id', arrendamientoController.deleteArrendamiento);

module.exports = api;