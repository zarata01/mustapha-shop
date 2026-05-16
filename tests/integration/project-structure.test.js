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
    'views/home.ejs',
    'public/css/styles.css',
    '.env.example'
  ].forEach((filePath) => {
    assert.equal(fs.existsSync(path.join(root, filePath)), true, `${filePath} should exist`);
  });
});

test('routes include public pages, health check, and protected dashboards', () => {
  const routes = read('src/routes/index.js');

  ['/', '/parts', '/packs', '/cart', '/checkout', '/health'].forEach((route) => {
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
