'use strict';
const eventHub = require('./eventHub');

module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  eventHub.emit('error', error);
  res.status(404).json(error);
};
