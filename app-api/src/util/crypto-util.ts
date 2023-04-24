import * as dotenv from 'dotenv';
import {createCipheriv, createDecipheriv, randomBytes, scrypt} from 'crypto';
import { promisify } from 'util';

dotenv.config();

export class CryptoUtil {

    public static async encrypt(text: any): Promise<any | null> {
        try {
            const initVector = randomBytes(16);
            console.log(initVector);

            const key = (await promisify(scrypt)(process.env.CRYPTO_PASS, 'salt', 32)) as Buffer;
            console.log(key);

            const cipher = createCipheriv(process.env.CRYPTO_ALGO, key, initVector);
            let encryptedData = cipher.update(text, "utf-8", "hex");
            encryptedData += cipher.final("hex");
            console.log("Encrypted message: " + encryptedData);
            return encryptedData;
        } catch (e) {
            return null;
        }
    }

    public static async decrypt(text: any): Promise<any | null> {
        try {
            const initVector = randomBytes(16);
            console.log(initVector);

            const key = (await promisify(scrypt)(process.env.CRYPTO_PASS, 'salt', 32)) as Buffer;
            console.log(key);

            const decipher = createDecipheriv(process.env.CRYPTO_ALGO, key, initVector);
            let decryptedData = decipher.update(text, "hex", "utf-8");
            decryptedData += decipher.final("utf8");
            console.log("Decrypted message: " + decryptedData);
            return decryptedData;
        } catch (e) {
            return null;
        }
    }
}