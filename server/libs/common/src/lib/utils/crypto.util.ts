import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

const secretKey = 'dsakl@740%knvsdkhrjsdcopimcnxz';
const secretIV = '589347fjljcm,ncvuf@iovxsd9082';
const encryptionMethod = 'aes-256-cbc';

export class CryptoUtil {
  readonly apiSecretKey = 'kjadhk asklad alsd';
  readonly apiSecretIV = 'kjadhk asklad alsd';
  // Generate secret hash with crypto to use for encryption
  key = crypto.createHash('sha512').update(secretKey).digest('hex').substring(0, 32);
  encryptionIV = crypto.createHash('sha512').update(secretIV).digest('hex').substring(0, 16);

  // Generate secret hash with crypto to use for encryption
  apiKey = crypto.createHash('sha512').update(this.apiSecretKey).digest('hex').substring(0, 32);
  apiEncryptionIV = crypto.createHash('sha512').update(this.apiSecretIV).digest('hex').substring(0, 16);

  // Encrypt data
  encryptData(data: string) {
    if (!secretKey || !secretIV || !encryptionMethod) {
      throw new Error('secretKey, secretIV, and ecnryptionMethod are required');
    }
    const cipher = crypto.createCipheriv(encryptionMethod, this.key, this.encryptionIV);
    return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64'); // Encrypts data and converts to hex and base64
  }

  // Encrypt Decrypt API DATA
  decryptApiData(data: string) {
    if (!secretKey || !secretIV || !encryptionMethod) {
      throw new Error('secretKey, secretIV, and ecnryptionMethod are required');
    }
    const cipher = crypto.createCipheriv(encryptionMethod, this.apiKey, this.apiEncryptionIV);
    return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64'); // Encrypts data and converts to hex and base64
  }

  // Decrypt data
  decryptData(encryptedData) {
    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = crypto.createDecipheriv(encryptionMethod, this.key, this.encryptionIV);
    return decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8'); // Decrypts data and converts to utf8
  }

  static async generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  static async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}


