import { Request, Response, NextFunction } from 'express';
import { AiStartService } from '@api/aiStart/AiStart.service';
import { AiStartInterface } from '@api/aiStart/AiStart.interface';

export class AiStartController {
  public async voiceStart(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      const { callid } = req.body;
      const startData: AiStartInterface = { userKey: callid };
      const aiStartService = new AiStartService(res, projectId, startData);
      const { status, data } = await aiStartService.soeLogin();
      return res.status(200).json({ status, data });
    } catch (error) {
      next(error);
    }
  }
  public async chatStart(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId, workspaceId } = req.params;
      const startData: AiStartInterface = req.body;
      const aiStartService = new AiStartService(
        res,
        projectId,
        startData,
        workspaceId,
      );
      const result = await aiStartService.soeLogin();
      return res.status(200).json({ status: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}