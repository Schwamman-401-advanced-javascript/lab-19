'use strict';

const Q = require('@nmq/q/client');

const db = new Q('database');
const net = new Q('network');

db.subscribe('update', payload => {
  console.log('We gots an update:', payload);
});

db.subscribe('read', payload => {
  console.log('We gots something:', payload);
});

db.subscribe('error', payload => {
  console.log('Something went wrong:', payload);
});

net.subscribe('attack', payload => {
  console.log('You\'re under attack', payload);
});
