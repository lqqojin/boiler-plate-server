"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiStartRoute = void 0;
var express_1 = require("express");
var AiStart_controller_1 = require("../aiStart/AiStart.controller");
var AiStartRoute = /** @class */ (function () {
    function AiStartRoute() {
        this.voicePath = '/ivr/aistart';
        this.chatPath = '/login';
        this.router = (0, express_1.Router)();
        this.aiStartController = new AiStart_controller_1.AiStartController();
        this.initializeRoutes();
    }
    AiStartRoute.prototype.initializeRoutes = function () {
        this.router.post("".concat(this.voicePath, "/:projectId"), this.aiStartController.voiceStart);
        this.router.post("".concat(this.chatPath, "/:projectId/"), this.aiStartController.chatStart);
        this.router.post("".concat(this.chatPath, "/:projectId/:workspaceId"), this.aiStartController.chatStart);
    };
    return AiStartRoute;
}());
exports.AiStartRoute = AiStartRoute;
