import * as dotenv from 'dotenv';
import { IAppConfig } from '@common/interfaces';

dotenv.config();

export const appConfig: IAppConfig = {
  // Server
  host: process.env.HOST ?? 'localhost',
  port: Number(process.env.PORT ?? 8080),
  environment: process.env.NODE_ENV ?? 'local',
  version: process.env.VERSION ?? '0.0.1',
  prefix: process.env.PREFIX ?? '/api',

  // Database
  databaseUrl:
    process.env.DATABASE_URL ??
    'postgres://postgres:password@localhost:5432/postgres',
};
