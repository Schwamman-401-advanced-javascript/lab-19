'use strict';

require('dotenv').config();

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser:true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGODB_URI, options);


const Roles = require('./src/auth/roles-model');
const capabilities = {
  admin: ['create','read','update','delete'],
  editor: ['create', 'read', 'update'],
  user: ['read'],
};
for (const role in capabilities) {
  Roles.findOne({role: role})
    .then(result => {
      if (!result) {
        const document = new Roles({role: role, capabilities: capabilities[role]});
        document.save();
      } else {
        console.log(result);
      }
    });
}

// Start the web server
require('./src/app.js').start(process.env.PORT);
