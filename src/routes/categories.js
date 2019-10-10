const express = require('express');

const router = express.Router();

const auth = require('../auth/middleware');
const Categories = require('../models/categories/categories');
const categories = new Categories();

router.get('/api/v1/categories', getCategories);
router.post('/api/v1/categories', auth('create'), postCategories);
router.get('/api/v1/categories/:id', getCategory);
router.put('/api/v1/categories/:id', auth('update'), putCategories);
router.delete('/api/v1/categories/:id', auth('delete'), deleteCategories);

function getCategories(request,response,next) {
  categories.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function getCategory(request,response,next) {
  // expects an array with the one matching record from the model
  categories.get(request.params.id)
    .then( result => {
      if (!result) {
        return response.sendStatus(404);
      }
      response.status(200).json(result);
    })
    .catch( next );
}

function postCategories(request,response,next) {
  categories.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function putCategories(request,response,next) {
  // expects the record that was just updated in the database
  categories.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function deleteCategories(request,response,next) {
  // Expects no return value (resource was deleted)
  categories.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;