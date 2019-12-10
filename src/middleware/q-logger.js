'use strict';

const Q = require('@nmq/q/client');
const eventHub = require('./eventHub');

initializeLogger();

function initializeLogger() {
  console.log('Logger Connected!');

  eventHub.on('create', log('create'));
  eventHub.on('read', log('read'));
  eventHub.on('update', log('update'));
  eventHub.on('delete', log('delete'));
  eventHub.on('error', log('error'));

  function log(eventType) {
    return payload => {
      Q.publish('database', eventType, payload);
    };
  }

}