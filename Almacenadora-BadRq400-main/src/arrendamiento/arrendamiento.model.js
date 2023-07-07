'use strict'
const mongoose = require('mongoose');

const arrendamientoSchema = mongoose.Schema({
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date
    },
    precioTotal: {
        type: Number,
        required: true
    },
    serviciosAdicionales: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    bodega: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bodega',
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
   // {
     //   timestamps: true
    //},
    {
        versionKey: false
    });
    
module.exports = mongoose.model('Arrendamiento', arrendamientoSchema);