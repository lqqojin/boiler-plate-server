"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const users_route_1 = __importDefault(require("./api/users/users.route"));
const index_route_1 = __importDefault(require("./api/index/index.route"));
const logger_1 = require("./utils/logger");
(0, validateEnv_1.default)();
const app = new App_1.App([new index_route_1.default(), new users_route_1.default()]);
app.listen();
process.on('uncaughtException', error => {
    logger_1.logger.error('================[uncaught Exception]================');
    logger_1.logger.error(error);
    logger_1.logger.error('====================================================');
});
