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
exports.App = void 0;
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose = __importStar(require("mongoose"));
const _config_1 = require("./config");
const _databases_1 = require("./databases");
const logger_1 = require("./utils/logger");
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.env = _config_1.NODE_ENV || '';
        this.port = _config_1.PORT;
        this.logFormat = _config_1.LOG_FORMAT || '../../logs';
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }
    async listen() {
        await this.connectToMongodb();
        this.app.listen(this.port, () => {
            logger_1.logger.info(`======= ENV: ${this.env} =======`);
            logger_1.logger.info(`🚀port ${this.port}🚀`);
            logger_1.logger.info(`================================`);
        });
    }
    getServer() {
        return this.app;
    }
    async connectToMongodb() {
        mongoose.set('strictQuery', false);
        if (this.env !== 'production')
            mongoose.set('debug', true);
        // try {
        await mongoose.connect(_databases_1.mongodbConnection, {
            serverSelectionTimeoutMS: 3000,
            // server: { socket_options: { socketTimeoutMS: 3000 } },
        });
        // } catch (error) {
        //   logger.error(error);
        //   throw error;
        // }
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)(_config_1.LOG_FORMAT, { stream: logger_1.stream }));
        this.app.use((0, cors_1.default)({ origin: _config_1.ORIGIN, credentials: _config_1.CREDENTIALS }));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, hpp_1.default)());
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }
}
exports.App = App;
