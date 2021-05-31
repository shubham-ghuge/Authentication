var mongoose = require('mongoose');
require('dotenv').config();

async function initializeDB() {
  try {
    await mongoose.connect(process.env['connection_uri'], { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('Database Successfully connected');
  }
  catch (error) {
    throw error;
  }
}

module.exports = { initializeDB }