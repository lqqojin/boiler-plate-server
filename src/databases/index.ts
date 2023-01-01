import {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} from '@config';

export const mongodbConnection = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?connectTimeoutMS=1000&authSource=${DB_DATABASE}`;
// 'mongodb://10.1.14.142:27017,10.1.14.155:37017/isacbot_db_admin?replicaSet=rs0&readPreference=secondaryPreferred&maxStalenessSeconds=120';
