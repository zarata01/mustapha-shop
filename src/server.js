const createApp = require('./app');
const env = require('./config/env');
const { connectDatabase } = require('./config/database');

async function startServer() {
  try {
    await connectDatabase();
    const app = createApp();
    app.listen(env.port, () => {
      console.log(`Mustapha Shop running at http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
