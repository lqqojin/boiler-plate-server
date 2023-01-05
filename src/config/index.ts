import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  ORIGIN,
  LOG_DIR,
  LOG_FORMAT,
  REDIS_IP,
  REDIS_PORT,
  REDIS_PW,
  MONGO_URL,
  SOE,
} = process.env;
