import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import UsersControllers from '@api/users/users.controllers';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersControllers();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
  }
}

export default UsersRoute;
