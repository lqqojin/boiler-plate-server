export interface ConfigInterface {
  NODE_ENV: string;
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  ORIGIN: boolean;
  LOG_DIR: string;
  LOG_FORMAT: string;
}
