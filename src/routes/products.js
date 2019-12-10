const express = require('express');

const router = express.Router();

const auth = require('../auth/middleware');
const Products = require('../models/products/products');
const products = new Products();

router.get('/api/v1/products', getProducts);
router.post('/api/v1/products', auth('create'), postProducts);
router.get('/api/v1/products/:id', getProduct);
router.put('/api/v1/products/:id', auth('update'), putProducts);
router.delete('/api/v1/products/:id', auth('delete'), deleteProducts);

function getProducts(request,response,next) {
  products.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function getProduct(request,response,next) {
  products.get(request.params.id)
    .then( result => {
      if (!result) {
        return response.sendStatus(404);
      }
      response.status(200).json(result);
    })
    .catch( next );
}

function postProducts(request,response,next) {
  products.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function putProducts(request,response,next) {
  products.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function deleteProducts(request,response,next) {
  products.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;