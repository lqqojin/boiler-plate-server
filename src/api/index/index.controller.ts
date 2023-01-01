import { NextFunction, Request, Response } from 'express';
import { logger } from '@utils/logger';

class IndexController {
  public index(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('IndexController');
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

export default IndexController;
