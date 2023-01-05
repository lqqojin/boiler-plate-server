import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { UsersController } from '@api/users/users.controllers';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.usersController.createUser);
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
  }
}

export default UsersRoute;
