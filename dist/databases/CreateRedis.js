"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRedis = void 0;
var ioredis_1 = __importDefault(require("ioredis"));
var _config_1 = require("../config");
var logger_1 = require("../utils/logger");
var CreateRedis = /** @class */ (function () {
    function CreateRedis(str) {
        logger_1.logger.info("Redis ".concat(str));
        this.redisPort = parseInt(_config_1.REDIS_PORT);
        this.host = _config_1.REDIS_IP;
        this.options = {
            connectTimeout: 5000,
            password: _config_1.REDIS_PW,
        };
        this.connectToDB();
    }
    CreateRedis.prototype.connectToDB = function () {
        this.redis = new ioredis_1.default(this.redisPort, this.host, this.options);
    };
    CreateRedis.getInstance = function () {
        if (!CreateRedis.instance) {
            CreateRedis.instance = new CreateRedis('디자인패턴: singleton 객체 생성');
        }
        return CreateRedis.instance;
    };
    return CreateRedis;
}());
exports.CreateRedis = CreateRedis;
