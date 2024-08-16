import * as bcrypt from 'bcrypt';
import * as CryptoJS from 'crypto-js';
import { appConfig } from 'src/configs';

export class EncryptHelper {
  static hash(str: string, saltRounds = 10): string {
    return bcrypt.hashSync(str, saltRounds);
  }

  static compare(str: string, hash: string): boolean {
    return bcrypt.compareSync(str, hash);
  }

  static encryptData(data: string): string {
    const hash = CryptoJS.AES.encrypt(data, appConfig.aesKey).toString();
    return hash;
  }

  static decryptData(hash: string): string {
    const data = CryptoJS.AES.decrypt(hash, appConfig.aesKey).toString(
      CryptoJS.enc.Utf8,
    );
    return data;
  }
}
