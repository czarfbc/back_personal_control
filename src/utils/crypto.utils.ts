import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoUtils {
  async encrypt(data: string): Promise<{ encryptedData: string; iv: string }> {
    const iv = randomBytes(16);
    const cryptoKey = process.env.CRYPTO_KEY;
    const key = (await promisify(scrypt)(cryptoKey, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedData = Buffer.concat([
      cipher.update(data, 'utf-8'),
      cipher.final(),
    ]).toString('hex');

    return { encryptedData, iv: iv.toString('hex') };
  }

  async decrypt(encrypted_data: string, iv: string): Promise<string> {
    const cryptoKey = process.env.CRYPTO_KEY;

    const findIv = Buffer.from(iv, 'hex');
    const key = (await promisify(scrypt)(cryptoKey, 'salt', 32)) as Buffer;

    const decipher = createDecipheriv('aes-256-ctr', key, findIv);
    const decryptedData = Buffer.concat([
      decipher.update(Buffer.from(encrypted_data, 'hex')),
      decipher.final(),
    ]).toString();

    return decryptedData;
  }
}
