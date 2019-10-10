'use strict';
const eventHub = require('./eventHub');

module.exports = (err, req, res, next) => {
  let error = { error: err.message || err };
  eventHub.emit('error', error);
  res.status(err.status || 500).json(error);
};
