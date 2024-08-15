export interface IAppConfig {
  // Server
  readonly host: string;
  readonly port: number;
  readonly environment: string;
  readonly version: string;
  readonly prefix: string;

  // Database
  readonly databaseUrl: string;
}
