const mongoose = require('mongoose');
const env = require('./env');

async function connectDatabase(uri = env.mongoUri) {
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  return mongoose.connection;
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

module.exports = {
  connectDatabase,
  disconnectDatabase
};
