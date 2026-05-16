const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mustapha_shop',
  sessionSecret: process.env.SESSION_SECRET || 'development-session-secret-change-me',
  sessionName: process.env.SESSION_NAME || 'mustapha_shop_sid',
  trustProxy: process.env.TRUST_PROXY === 'true'
};

module.exports = env;
