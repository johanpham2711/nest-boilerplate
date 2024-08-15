export interface IAppConfig {
  // Server
  readonly host: string;
  readonly port: number;
  readonly environment: string;
  readonly version: string;

  // Database
  readonly databaseUrl: string;
}
