import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import morgan from 'morgan';
import * as mongoose from 'mongoose';

import { NODE_ENV, PORT, CREDENTIALS, ORIGIN, LOG_FORMAT } from '@config';
import { mongodbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import { logger, stream } from '@utils/logger';

export class App {
  public app: express.Application;
  public env: string | undefined;
  public port: string | undefined;
  private logFormat: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || '';
    this.port = PORT;
    this.logFormat = LOG_FORMAT || '../../logs';
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public async listen(): Promise<void> {
    await this.connectToMongodb();
    this.app.listen(this.port, () => {
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀port ${this.port}🚀`);
      logger.info(`================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToMongodb() {
    mongoose.set('strictQuery', false);
    if (this.env !== 'production') mongoose.set('debug', true);
    // try {
    await mongoose.connect(mongodbConnection, {
      serverSelectionTimeoutMS: 3000,
      // server: { socket_options: { socketTimeoutMS: 3000 } },
    });
    // } catch (error) {
    //   logger.error(error);
    //   throw error;
    // }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT as string, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(hpp());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}
