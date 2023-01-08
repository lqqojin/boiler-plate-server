import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston, { format } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '@config';
import util from 'util';

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
    warn: 'green',
    info: 'yellow',
  },
};

winston.addColors(config.colors);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = format.printf(({ timestamp, level, message }) => {
  level = level.toUpperCase();
  if (typeof message === 'object') {
    return util
      .format('%o', message)
      .trim()
      .split('\n')
      .map(line => {
        return `${timestamp} [${level}]: ${line}`;
      })
      .join('\n');
  }
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  levels: config.levels,
  format: format.combine(
    format.timestamp({
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
    format: format.combine(format.splat(), format.colorize({ all: true })),
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
