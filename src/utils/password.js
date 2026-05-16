const crypto = require('node:crypto');

const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');

    crypto.scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS, (error, derivedKey) => {
      if (error) return reject(error);
      return resolve(`scrypt:${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

function verifyPassword(password, passwordHash = '') {
  return new Promise((resolve, reject) => {
    const [algorithm, salt, storedKey] = passwordHash.split(':');

    if (algorithm !== 'scrypt' || !salt || !storedKey) return resolve(false);

    crypto.scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS, (error, derivedKey) => {
      if (error) return reject(error);

      const storedBuffer = Buffer.from(storedKey, 'hex');
      if (storedBuffer.length !== derivedKey.length) return resolve(false);

      return resolve(crypto.timingSafeEqual(storedBuffer, derivedKey));
    });
  });
}

module.exports = {
  hashPassword,
  verifyPassword
};
