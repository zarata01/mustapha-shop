const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function readBoolean(name, defaultValue = false) {
  const value = process.env[name];
  if (value === undefined) return defaultValue;
  return value === 'true';
}

const nodeEnv = process.env.NODE_ENV || 'development';
const databaseRequired = process.env.DB_REQUIRED === undefined
  ? nodeEnv === 'production'
  : readBoolean('DB_REQUIRED');

const env = {
  nodeEnv,
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mustapha_shop',
  mongoUriFallback: process.env.MONGODB_DIRECT_URI || process.env.MONGODB_SRV || process.env.mongodb_srv || '',
  databaseRequired,
  sessionSecret: process.env.SESSION_SECRET || 'development-session-secret-change-me',
  sessionName: process.env.SESSION_NAME || 'mustapha_shop_sid',
  trustProxy: readBoolean('TRUST_PROXY')
};

module.exports = env;
