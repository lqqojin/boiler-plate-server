// import { CreateUserDto } from '@api/users/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { UserInterface } from '@api/users/users.interface';
import { isEmpty } from '@utils/util';
import userModel from '@api/users/users.model';
import { logger } from '@utils/logger';

class UserService {
  public async findUserById(userId: string) {
    if (isEmpty(userId)) throw new HttpException(400, 'User Id is empty');
    try {
      const findUser: UserInterface | null = await userModel.findOne({
        email: userId,
      });
      if (findUser) logger.info('test1');
      return findUser;
    } catch (error) {
      // throw new HttpException(409, `user doesn't exist`);
      // return findUser: UserInterface;
      // return resolve(findUser);
    }
  }

  /*
  public async createUser(userData: CreateUserDto): Promise<User[]> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    const findUser: User = await
  }
*/
}

export default UserService;
