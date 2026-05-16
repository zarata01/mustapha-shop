const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword, verifyPassword } = require('../../src/utils/password');

test('password utility hashes with scrypt and verifies using timing-safe comparison path', async () => {
  const passwordHash = await hashPassword('StrongPass123');

  assert.match(passwordHash, /^scrypt:[a-f0-9]+:[a-f0-9]+$/);
  assert.equal(await verifyPassword('StrongPass123', passwordHash), true);
  assert.equal(await verifyPassword('wrong-password', passwordHash), false);
});
