"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res, next) {
        try {
            return res.sendStatus(200);
        }
        catch (error) {
            next(error);
        }
    };
    return IndexController;
}());
exports.default = IndexController;
