import * as crypto from 'crypto';

const secretKey = 'dsakl@740%knvsdkhrjsdcopimcnxz';
const secretIV = '589347fjljcm,ncvuf@iovxsd9082';
const encryptionMethod = 'aes-256-cbc';

export const apiSecretKey = 'kjadhk asklad alsd';
export const apiSecretIV = 'kjadhk asklad alsd';

if (!secretKey || !secretIV || !encryptionMethod) {
  throw new Error('secretKey, secretIV, and ecnryptionMethod are required');
}

// Generate secret hash with crypto to use for encryption
const key = crypto.createHash('sha512').update(secretKey).digest('hex').substring(0, 32);
const encryptionIV = crypto.createHash('sha512').update(secretIV).digest('hex').substring(0, 16);

// Generate secret hash with crypto to use for encryption
const apiKey = crypto.createHash('sha512').update(apiSecretKey).digest('hex').substring(0, 32);
const apiEncryptionIV = crypto.createHash('sha512').update(apiSecretIV).digest('hex').substring(0, 16);

// Encrypt data
export function encryptData(data) {
  const cipher = crypto.createCipheriv(encryptionMethod, key, encryptionIV);
  return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64'); // Encrypts data and converts to hex and base64
}

// Encrypt Decrypt API DATA
export function decryptApiData(data) {
  const cipher = crypto.createCipheriv(encryptionMethod, apiKey, apiEncryptionIV);
  return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64'); // Encrypts data and converts to hex and base64
}

// Decrypt data
export function decryptData(encryptedData) {
  const buff = Buffer.from(encryptedData, 'base64');
  const decipher = crypto.createDecipheriv(encryptionMethod, key, encryptionIV);
  return decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8'); // Decrypts data and converts to utf8
}
