'use stric'
const express = require('express');
const api = express.Router();
const bodegaController = require('./bodega.controller');

// Rutas para las bodegas
api.get('/getbodega', bodegaController.getBodegas);
api.post('/addbodegas', bodegaController.createBodega);
//api.get('/bodegas/:id', bodegaController.obtenerBodegaPorId);
api.put('/updatebodega/:id', bodegaController.updateBodega);
api.delete('/delete/:id', bodegaController.deleteBodega);
//api.post('/searchbodegas/search',bodegaController.search);


module.exports = api;