import { HttpException } from '@/exceptions/HttpException';
import { UserInterface } from '@api/users/users.interface';
import { isEmpty } from '@utils/util';
import userModel from '@api/users/users.model';
import { logger } from '@utils/logger';

export class UsersService {
  public async findUserById(userId: string) {
    if (isEmpty(userId)) throw new HttpException(400, 'User Id is empty');
    try {
      const users = await userModel.findOne({
        email: userId,
      });
      if (users) logger.info('test1');
      return users;
    } catch (error) {
      throw new HttpException(409, `user doesn't exist`);
    }
  }

  public async createUser(userData: UserInterface) {
    try {
      logger.info(userData);
      // if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
      return await userModel.create(userData);
    } catch (error) {
      logger.error(error);
    }
  }
}
