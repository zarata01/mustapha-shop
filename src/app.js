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

function createSessionStore() {
  if (env.nodeEnv === 'test') return undefined;
  return MongoStore.create({ mongoUrl: env.mongoUri, collectionName: 'sessions' });
}

function createApp() {
  const app = express();

  app.set('env', env.nodeEnv);
  app.set('trust proxy', env.trustProxy);
  app.set('view engine', 'ejs');
  app.set('views', path.join(process.cwd(), 'views'));

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
    store: createSessionStore(),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.nodeEnv === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }));

  app.use(attachCurrentUser);
  app.use(routes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
