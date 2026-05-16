const path = require('node:path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const methodOverride = require('method-override');

const env = require('./config/env');
const routes = require('./routes');
const { attachCurrentUser } = require('./middleware/authMiddleware');
const { generalLimiter } = require('./middleware/rateLimitMiddleware');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');
const { attachCsrfToken } = require('./middleware/csrfMiddleware');

function createSessionStore(sessionMongoUri) {
  if (env.nodeEnv === 'test' || !sessionMongoUri) return undefined;
  return MongoStore.create({ mongoUrl: sessionMongoUri, collectionName: 'sessions' });
}

function createApp(options = {}) {
  const app = express();
  const sessionMongoUri = options.sessionMongoUri || (options.databaseConnected ? env.mongoUri : null);

  app.set('env', env.nodeEnv);
  app.set('trust proxy', env.trustProxy);
  app.set('view engine', 'ejs');
  app.set('views', path.join(process.cwd(), 'views'));
  app.locals.databaseConnected = Boolean(options.databaseConnected);
  app.locals.sessionName = env.sessionName;

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression());
  app.use(generalLimiter);
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(methodOverride('_method'));
  app.use(express.static(path.join(process.cwd(), 'public')));

  app.use(session({
    name: env.sessionName,
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(sessionMongoUri),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.nodeEnv === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }));

  app.use(attachCsrfToken);
  app.use(attachCurrentUser);
  app.use(routes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
