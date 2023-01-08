"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var compression_1 = __importDefault(require("compression"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var hpp_1 = __importDefault(require("hpp"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var _config_1 = require("./config");
var logger_1 = require("./utils/logger");
var CreateMongodb_1 = require("./databases/CreateMongodb");
var CreateRedis_1 = require("./databases/CreateRedis");
// import { CreateRedis } from './databases/CreateRedis';
var App = /** @class */ (function () {
    function App(routes) {
        this.app = (0, express_1.default)();
        this.env = _config_1.NODE_ENV;
        this.port = _config_1.PORT;
        this.logFormat = _config_1.LOG_FORMAT;
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }
    App.prototype.listen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connectDatabases()];
                    case 1:
                        _a.sent();
                        this.app.listen(this.port, function () {
                            logger_1.logger.info("======= ENV: ".concat(_this.env, " ======="));
                            logger_1.logger.info("\uD83D\uDE80 port ".concat(_this.port, " \uD83D\uDE80"));
                            logger_1.logger.info("================================");
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.getServer = function () {
        return this.app;
    };
    App.prototype.initializeMiddlewares = function () {
        this.app.use((0, morgan_1.default)('[:method] [:url] [:response-time ms] [HTTP/:http-version] [statusCode::status] [content-length::res[content-length]]', {
            stream: logger_1.stream,
        }));
        this.app.use((0, cors_1.default)({ origin: _config_1.ORIGIN, credentials: _config_1.CREDENTIALS }));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, hpp_1.default)());
    };
    App.prototype.initializeRoutes = function (routes) {
        var _this = this;
        routes.forEach(function (route) {
            _this.app.use('/', route.router);
        });
    };
    App.prototype.connectDatabases = function () {
        return __awaiter(this, void 0, void 0, function () {
            var createMongodb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createMongodb = new CreateMongodb_1.CreateMongodb();
                        CreateRedis_1.CreateRedis.getInstance(); // 싱글턴 객체 생성
                        return [4 /*yield*/, createMongodb.connectToDB()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return App;
}());
exports.App = App;
