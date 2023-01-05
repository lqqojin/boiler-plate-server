"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.logger = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var winston_1 = __importDefault(require("winston"));
var winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
var _config_1 = require("../config");
// logs dir
var logDir = (0, path_1.join)(__dirname, _config_1.LOG_DIR);
var config = {
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
winston_1.default.addColors(config.colors);
if (!(0, fs_1.existsSync)(logDir)) {
    (0, fs_1.mkdirSync)(logDir);
}
// Define log format
var logFormat = winston_1.default.format.printf(function (_a) {
    var timestamp = _a.timestamp, level = _a.level, message = _a.message;
    return "".concat(timestamp, " ").concat(level, ": ").concat(message);
});
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
var logger = winston_1.default.createLogger({
    levels: config.levels,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }), logFormat),
    transports: [
        // error log setting
        new winston_daily_rotate_file_1.default({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: "%DATE%.log",
            maxFiles: 30,
            handleExceptions: true,
            json: false,
            zippedArchive: true,
        }),
        // debug log setting
        new winston_daily_rotate_file_1.default({
            level: 'debug',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/debug',
            filename: "%DATE%.log",
            maxFiles: 30,
            json: false,
            zippedArchive: true,
        }),
    ],
});
exports.logger = logger;
logger.add(new winston_1.default.transports.Console({
    format: winston_1.default.format.combine(
    // winston.format.prettyPrint(),
    winston_1.default.format.splat(), winston_1.default.format.colorize({ all: true })),
}));
var stream = {
    write: function (message) {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
};
exports.stream = stream;
logger.error('error Level, This is Logging System!');
logger.debug('Debug Level, This is Logging System!');
logger.warn('Warn Level, This is Logging System!');
logger.info('Info Level, This is Logging System!');
