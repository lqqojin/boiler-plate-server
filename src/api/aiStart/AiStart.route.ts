import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AiStartController } from '@api/aiStart/AiStart.controller';

export class AiStartRoute implements Routes {
  public voicePath = '/ivr/aistart';
  public chatPath = '/login';
  public router = Router();
  public aiStartController = new AiStartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.voicePath}/:projectId`,
      this.aiStartController.voiceStart,
    );
    this.router.post(
      `${this.chatPath}/:projectId/`,
      this.aiStartController.chatStart,
    );
    this.router.post(
      `${this.chatPath}/:projectId/:workspaceId`,
      this.aiStartController.chatStart,
    );
  }
}
