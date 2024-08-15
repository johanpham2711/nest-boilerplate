import * as dotenv from 'dotenv';
import { IConfig } from 'src/interfaces';
dotenv.config();

export const config: IConfig = {
  // Server
  port: Number(process.env.PORT ?? 8080),
  environment: process.env.NODE_ENV ?? 'local',

  // Database
  databaseUrl:
    process.env.DATABASE_URL ??
    'postgres://postgres:password@localhost:5432/postgres',
};
