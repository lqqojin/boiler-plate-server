"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_controllers_1 = require("../users/users.controllers");
var UsersRoute = /** @class */ (function () {
    function UsersRoute() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.usersController = new users_controllers_1.UsersController();
        this.initializeRoutes();
    }
    UsersRoute.prototype.initializeRoutes = function () {
        this.router.post("".concat(this.path), this.usersController.createUser);
        this.router.get("".concat(this.path, "/:id"), this.usersController.getUserById);
    };
    return UsersRoute;
}());
exports.default = UsersRoute;
