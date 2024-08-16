import * as dotenv from 'dotenv';
import { IAppConfig } from 'src/interfaces';
dotenv.config();

export const appConfig: IAppConfig = {
  // Server
  host: process.env.HOST ?? 'localhost',
  port: Number(process.env.PORT ?? 8080),
  environment: process.env.NODE_ENV ?? 'local',
  version: process.env.VERSION ?? '0.0.1',
  prefix: process.env.PREFIX ?? '/api',

  // Security
  aesKey: process.env.AES_KEY ?? 'FzF8V3JU2u2e5jPZ',
  jwtSecret: process.env.JWT_SECRET ?? 'secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '5m',

  // Database
  databaseUrl:
    process.env.DATABASE_URL ??
    'postgres://postgres:password@localhost:5432/postgres',

  // Mail
  mailHost: process.env.MAIL_HOST ?? 'smtp.mailtrap.io',
  smtpUsername: process.env.SMTP_USERNAME ?? 'username',
  smtpPassword: process.env.SMTP_PASSWORD ?? 'password',
};
