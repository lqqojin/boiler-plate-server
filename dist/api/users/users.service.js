"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { CreateUserDto } from '../users/users.dto';
const HttpException_1 = require("../../exceptions/HttpException");
const util_1 = require("../../utils/util");
const users_model_1 = __importDefault(require("../users/users.model"));
const logger_1 = require("../../utils/logger");
class UserService {
    async findUserById(userId) {
        if ((0, util_1.isEmpty)(userId))
            throw new HttpException_1.HttpException(400, 'User Id is empty');
        try {
            const findUser = await users_model_1.default.findOne({
                email: userId,
            });
            if (findUser)
                logger_1.logger.info('test1');
            return findUser;
        }
        catch (error) {
            // throw new HttpException(409, `user doesn't exist`);
            // return findUser: UserInterface;
            // return resolve(findUser);
        }
    }
}
exports.default = UserService;
