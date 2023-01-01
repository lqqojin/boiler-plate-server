"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../users/users.service"));
const logger_1 = require("../../utils/logger");
class UsersController {
    constructor() {
        this.userService = new users_service_1.default();
        this.getUserById = async (req, res, next) => {
            try {
                const userId = req.params.id;
                console.log('good', userId);
                const findOneUserData = await this.userService.findUserById(userId);
                return res
                    .status(200)
                    .json({ data: findOneUserData, message: 'findOne' });
            }
            catch (error) {
                logger_1.logger.info('test3');
                next(error);
            }
        };
        // public async createUser(req: Request, res: Response, next: NextFunction) {
        //     res.status(201).json({ data: createUserData, message: 'created' })
        //   try {
        //     const userData: CreateUserDto = req.body;
        //     const createUserData: User = await this.userService.createUser(userDate);
        //
        //   } catch (error) {
        //     next(error);
        //   }
        // }
    }
}
exports.default = UsersController;
