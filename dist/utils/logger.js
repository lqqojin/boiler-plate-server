"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.logger = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var winston_1 = __importStar(require("winston"));
var winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
var _config_1 = require("../config");
var util_1 = __importDefault(require("util"));
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
        warn: 'green',
        info: 'yellow',
    },
};
winston_1.default.addColors(config.colors);
if (!(0, fs_1.existsSync)(logDir)) {
    (0, fs_1.mkdirSync)(logDir);
}
// Define log format
var logFormat = winston_1.format.printf(function (_a) {
    var timestamp = _a.timestamp, level = _a.level, message = _a.message;
    level = level.toUpperCase();
    if (typeof message === 'object') {
        return util_1.default
            .format('%o', message)
            .trim()
            .split('\n')
            .map(function (line) {
            return "".concat(timestamp, " [").concat(level, "]: ").concat(line);
        })
            .join('\n');
    }
    return "".concat(timestamp, " [").concat(level, "]: ").concat(message);
});
var logger = winston_1.default.createLogger({
    levels: config.levels,
    format: winston_1.format.combine(winston_1.format.timestamp({
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
    format: winston_1.format.combine(winston_1.format.splat(), winston_1.format.colorize({ all: true })),
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
