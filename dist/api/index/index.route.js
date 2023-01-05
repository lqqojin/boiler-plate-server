"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_controller_1 = __importDefault(require("../index/index.controller"));
var IndexRoute = /** @class */ (function () {
    function IndexRoute() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.indexController = new index_controller_1.default();
        this.initializeRoutes();
    }
    IndexRoute.prototype.initializeRoutes = function () {
        this.router.get("/", this.indexController.index);
    };
    return IndexRoute;
}());
exports.default = IndexRoute;
