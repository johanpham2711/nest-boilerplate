import * as bcrypt from 'bcrypt';

export class EncryptHelper {
  static hash(str: string, saltRounds = 10): string {
    return bcrypt.hashSync(str, saltRounds);
  }

  static compare(str: string, hash: string): boolean {
    return bcrypt.compareSync(str, hash);
  }
}
