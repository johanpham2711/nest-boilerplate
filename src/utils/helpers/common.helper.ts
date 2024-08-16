export class CommonHelper {
  static generateOtp(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
