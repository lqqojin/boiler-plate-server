"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
var logger_1 = require("./utils/logger");
var validateEnv_1 = __importDefault(require("./utils/validateEnv"));
var users_route_1 = __importDefault(require("./api/users/users.route"));
var index_route_1 = __importDefault(require("./api/index/index.route"));
var AiStart_route_1 = require("./api/aiStart/AiStart.route");
(0, validateEnv_1.default)();
var app = new App_1.App([new index_route_1.default(), new users_route_1.default(), new AiStart_route_1.AiStartRoute()]);
app.listen();
process.on('uncaughtException', function (error) {
    logger_1.logger.error('================[uncaught Exception]================');
    logger_1.logger.error(error);
    logger_1.logger.error('====================================================');
});
