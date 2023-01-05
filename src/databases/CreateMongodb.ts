import mongoose from 'mongoose';
import {
  NODE_ENV,
  MONGO_URL,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
} from '@config';
import { logger } from '@utils/logger';

export class CreateMongodb {
  public env?: string;
  public mongodbUrl?: string;
  public mongodbConnection = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?connectTimeoutMS=1000&authSource=${DB_DATABASE}`;
  constructor() {
    this.env = NODE_ENV;
    this.mongodbUrl = MONGO_URL;
  }
  public async connectToDB(): Promise<boolean> {
    mongoose.set('strictQuery', true);
    if (this.env !== 'production') mongoose.set('debug', true);
    return new Promise(resolve => {
      mongoose
        .connect(this.mongodbConnection, {
          serverSelectionTimeoutMS: 3000,
          // server: { socket_options: { socketTimeoutMS: 3000 } },
        })
        .then(() => {
          logger.info('connected Mongodb');
          resolve(true);
        });
    });
  }
}
