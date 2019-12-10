'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/google.js');

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    })
    .catch(next);
});

authRouter.post('/signin', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

authRouter.get('/oauth', (req,res,next) => {
  oauth.authorize(req)
    .then( token => {
      res.status(200).send(token);
    })
    .catch(next);
});

authRouter.post('/key', auth('get-key'), (req, res) => {
  res.send(req.user.generateToken('key'));
});

//New authorized routes

authRouter.get('/hidden-stuff', auth('read'), (req, res) => {res.send('You are authroized');});

authRouter.post('/create-stuff', auth('create'), (req, res) => {res.send('You are authroized');});

authRouter.delete('/delete-stuff', auth('delete'), (req, res) => {res.send('You are authroized');});

module.exports = authRouter;
