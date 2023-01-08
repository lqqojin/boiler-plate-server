import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import morgan from 'morgan';

import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { logger, stream } from '@utils/logger';
import { CreateMongodb } from '@databases/CreateMongodb';
import { CreateRedis } from '@databases/CreateRedis';
// import { CreateRedis } from '@databases/CreateRedis';

export class App {
  public app: express.Application;
  public env: string | undefined;
  public port: string | undefined;
  public logFormat: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV;
    this.port = PORT;
    this.logFormat = LOG_FORMAT as string;
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public async listen(): Promise<void> {
    await this.connectDatabases();
    this.app.listen(this.port, () => {
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 port ${this.port} 🚀`);
      logger.info(`================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(
      morgan(
        '[:method] [:url] [:response-time ms] [HTTP/:http-version] [statusCode::status] [content-length::res[content-length]]',
        {
          stream,
        },
      ),
    );
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

  private async connectDatabases() {
    const createMongodb = new CreateMongodb();
    CreateRedis.getInstance(); // 싱글턴 객체 생성
    await createMongodb.connectToDB();
  }
}
