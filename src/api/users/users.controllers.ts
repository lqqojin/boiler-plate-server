import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from '@users/users.dto';
import { UserInterface } from '@api/users/users.interface';
import UserService from '@api/users/users.service';
import { logger } from '@utils/logger';

class UsersController {
  public userService = new UserService();

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId: string = req.params.id;
      console.log('good', userId);
      const findOneUserData: UserInterface | undefined | null =
        await this.userService.findUserById(userId);

      return res
        .status(200)
        .json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      logger.info('test3');
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

export default UsersController;
