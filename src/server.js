const createApp = require('./app');
const env = require('./config/env');
const { connectDatabase, redactMongoUri } = require('./config/database');

async function startServer() {
  let databaseConnected = false;
  let sessionMongoUri = null;

  try {
    const database = await connectDatabase();
    databaseConnected = true;
    sessionMongoUri = database.uri;
    console.log(`MongoDB connected: ${redactMongoUri(database.uri)}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);

    if (env.databaseRequired) {
      console.error('Database is required in this environment. Set DB_REQUIRED=false only for local development.');
      process.exit(1);
    }

    console.warn('Starting without MongoDB. Sessions will use in-memory storage and database-backed features will be unavailable.');
  }

  const app = createApp({ databaseConnected, sessionMongoUri });
  app.listen(env.port, () => {
    console.log(`Mustapha Shop running at http://localhost:${env.port}`);
  });
}

startServer();
