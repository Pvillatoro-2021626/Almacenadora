'use strict';

const mongoose = require('mongoose');

const bodegaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    },
    price: {
        type: Number,
        required: true
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: false
    }
}, { versionKey: false });

module.exports = mongoose.model('Bodega', bodegaSchema);
