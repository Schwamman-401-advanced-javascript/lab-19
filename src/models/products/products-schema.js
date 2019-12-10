'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: true},
  inStock: {type: Boolean},
});

module.exports = mongoose.model('products ', products);