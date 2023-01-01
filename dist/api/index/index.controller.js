"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../utils/logger");
class IndexController {
    index(req, res, next) {
        try {
            logger_1.logger.info('IndexController');
            res.sendStatus(200);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = IndexController;
