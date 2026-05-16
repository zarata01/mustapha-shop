const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const read = (filePath) => fs.readFileSync(path.join(root, filePath), 'utf8');

test('phase 1 project structure exists', () => {
  [
    'src/app.js',
    'src/server.js',
    'src/config/database.js',
    'src/middleware/errorMiddleware.js',
    'src/routes/index.js',
    'src/routes/authRoutes.js',
    'src/controllers/authController.js',
    'src/models/User.js',
    'src/models/SellerProfile.js',
    'src/validators/authValidators.js',
    'src/utils/password.js',
    'views/home.ejs',
    'views/auth/login.ejs',
    'views/auth/register.ejs',
    'public/css/styles.css',
    '.env.example'
  ].forEach((filePath) => {
    assert.equal(fs.existsSync(path.join(root, filePath)), true, `${filePath} should exist`);
  });
});

test('routes include public pages, health check, and protected dashboards', () => {
  const routes = read('src/routes/index.js');

  ['/', '/parts', '/packs', '/cart', '/checkout', '/account', '/health'].forEach((route) => {
    assert.match(routes, new RegExp(`['"]${route.replace('/', '\\/')}['"]`));
  });

  assert.match(routes, /requireAdmin/);
  assert.match(routes, /requireSeller/);
});

test('home view presents marketplace value proposition', () => {
  const home = read('views/home.ejs');

  assert.match(home, /compare sellers/);
  assert.match(home, /customize ready-made maintenance packs/);
  assert.match(home, /Phase 1 ready/);
});

test('database config supports Atlas direct URI fallback without logging secrets', () => {
  const env = read('src/config/env.js');
  const database = read('src/config/database.js');
  const server = read('src/server.js');
  const exampleEnv = read('.env.example');

  assert.match(env, /MONGODB_DIRECT_URI/);
  assert.match(env, /MONGODB_SRV/);
  assert.match(env, /mongodb_srv/);
  assert.match(database, /getMongoUriCandidates/);
  assert.match(database, /redactMongoUri/);
  assert.match(database, /shouldTryNextUri/);
  assert.match(server, /DB_REQUIRED=false/);
  assert.match(exampleEnv, /MONGODB_DIRECT_URI=/);
});


test('authentication phase files include secure registration, login, logout, and customer checkout guard', () => {
  const authRoutes = read('src/routes/authRoutes.js');
  const authController = read('src/controllers/authController.js');
  const authMiddleware = read('src/middleware/authMiddleware.js');
  const passwordUtils = read('src/utils/password.js');
  const userModel = read('src/models/User.js');

  assert.match(authRoutes, /router\.get\('\/register'/);
  assert.match(authRoutes, /router\.post\('\/register', requireCsrfToken/);
  assert.match(authRoutes, /router\.post\('\/login', requireCsrfToken/);
  assert.match(authRoutes, /router\.post\('\/logout', requireCsrfToken/);
  assert.match(authController, /role: 'customer'/);
  assert.match(authController, /req\.session\.regenerate/);
  assert.match(authMiddleware, /requireCustomerOrGuestCheckout/);
  assert.match(passwordUtils, /crypto\.scrypt/);
  assert.match(passwordUtils, /timingSafeEqual/);
  assert.match(userModel, /passwordHash/);
  assert.match(userModel, /select: false/);
});
