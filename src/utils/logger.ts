import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '@config';

// logs dir
const logDir: string = join(__dirname, LOG_DIR as string);

const config = {
  levels: {
    // 숫자가 낮을 수록 우선순위가 높습니다.
    error: 0,
    debug: 1,
    warn: 2,
    info: 3,
  },
  colors: {
    // 각각의 레벨에 대한 색상을 지정
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    info: 'green',
  },
};

winston.addColors(config.colors);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  levels: config.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }),
    logFormat,
  ),
  transports: [
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      // winston.format.prettyPrint(),
      winston.format.splat(),
      winston.format.colorize({ all: true }),
      // winston.format.printf(info => {
      //   if (typeof info.message === 'object') {
      //     info.message = JSON.stringify(info.message, null, 2);
      //   }
      //   return info.message;
      // }),
    ),
  }),
);

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

logger.error('error Level, This is Logging System!');
logger.debug('Debug Level, This is Logging System!');
logger.warn('Warn Level, This is Logging System!');
logger.info('Info Level, This is Logging System!');

export { logger, stream };
