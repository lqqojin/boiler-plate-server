"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = __importDefault(require("../users/users.controllers"));
class UsersRoute {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.usersController = new users_controllers_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    }
}
exports.default = UsersRoute;
