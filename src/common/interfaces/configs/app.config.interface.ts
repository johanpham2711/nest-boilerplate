export interface IAppConfig {
  // Server
  readonly host: string;
  readonly port: number;
  readonly environment: string;
  readonly version: string;
  readonly prefix: string;

  // Security
  readonly aesKey: string;
  readonly jwtSecret: string;
  readonly jwtExpiresIn: string;

  // Database
  readonly databaseUrl: string;

  // Redis
  readonly redisHost: string;
  readonly redisPort: number;
  readonly redisPassword: string;

  // Mail
  readonly mailHost: string;
  readonly smtpUsername: string;
  readonly smtpPassword: string;
}
