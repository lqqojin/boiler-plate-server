import Redis, { RedisOptions } from 'ioredis';
import { REDIS_IP, REDIS_PORT, REDIS_PW } from '@config';
import { logger } from '@utils/logger';

export class CreateRedis {
  private static instance: CreateRedis;
  private host: string;
  private redisPort: number;
  public redis: Redis | undefined;
  public options: RedisOptions;
  constructor(str: string) {
    logger.info(`Redis ${str}`);
    this.redisPort = parseInt(REDIS_PORT as string) as number;
    this.host = REDIS_IP as string;
    this.options = {
      connectTimeout: 5000,
      password: REDIS_PW as string,
    };
    this.connectToDB();
  }

  private connectToDB() {
    this.redis = new Redis(this.redisPort, this.host, this.options);
  }

  public static getInstance() {
    if (!CreateRedis.instance) {
      CreateRedis.instance = new CreateRedis('디자인패턴: singleton 객체 생성');
    }
    return CreateRedis.instance;
  }
}
