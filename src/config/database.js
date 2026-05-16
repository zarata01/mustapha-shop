const mongoose = require('mongoose');
const env = require('./env');

function redactMongoUri(uri = '') {
  return uri.replace(/(mongodb(?:\+srv)?:\/\/)([^@/]+)@/i, '$1<credentials>@');
}

function getMongoUriCandidates(primaryUri = env.mongoUri, fallbackUri = env.mongoUriFallback) {
  const candidates = [primaryUri, fallbackUri].filter(Boolean);
  return [...new Set(candidates)];
}

function shouldTryNextUri(error) {
  const retryableCodes = ['ECONNREFUSED', 'ENOTFOUND', 'ETIMEOUT', 'ESERVFAIL'];
  const message = error?.message || '';

  return retryableCodes.includes(error?.code)
    || retryableCodes.some((code) => message.includes(code))
    || message.includes('querySrv');
}

async function connectDatabase(options = {}) {
  const candidates = getMongoUriCandidates(options.uri || env.mongoUri, options.fallbackUri ?? env.mongoUriFallback);
  const connectOptions = {
    serverSelectionTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || 5000),
    ...options.mongooseOptions
  };

  mongoose.set('strictQuery', true);

  let lastError;
  for (const uri of candidates) {
    try {
      await mongoose.connect(uri, connectOptions);
      return { connection: mongoose.connection, uri };
    } catch (error) {
      lastError = error;
      if (!shouldTryNextUri(error)) break;
    }
  }

  throw lastError;
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
  getMongoUriCandidates,
  redactMongoUri,
  shouldTryNextUri
};
