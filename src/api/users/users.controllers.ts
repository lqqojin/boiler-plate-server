import { Request, Response, NextFunction } from 'express';
import { UserInterface } from '@api/users/users.interface';
import { UsersService } from '@api/users/users.service';

export class UsersController {
  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      const usersService = new UsersService();
      const users = await usersService.findUserById(userId);
      return res.status(200).json({ status: true, data: users });
    } catch (error) {
      next(error);
    }
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    // res.status(201).json({ data: createUserData, message: 'created' });
    try {
      const usersService = new UsersService();
      const userData: UserInterface = req.body;
      const result = await usersService.createUser(userData);
      return res.status(200).json({ status: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
