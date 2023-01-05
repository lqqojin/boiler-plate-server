import { Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { SOE } from '@config';
import { AiStartInterface } from '@api/aiStart/AiStart.interface';

export class AiStartService {
  public baseUrl: string = SOE as string;
  private readonly projectId: string | undefined;
  private readonly workspaceId?: string;
  private readonly url: string | undefined;
  private readonly startData: AiStartInterface | undefined;
  private config: AxiosRequestConfig<AiStartInterface> | undefined;
  public res: Response | undefined;

  constructor(
    res: Response,
    projectId: string,
    startData: AiStartInterface,
    workspaceId?: string,
  ) {
    this.projectId = projectId;
    this.workspaceId = workspaceId;
    this.startData = startData;
    this.res = res;
    this.url =
      `${this.baseUrl}/login/${this.projectId}/` +
      `${this.workspaceId ? '/' + this.workspaceId : ''}`;
  }

  public async soeLogin() {
    this.config = {
      method: 'POST',
      url: this.url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: this.startData,
    };
    return await axios(this.config);
  }
}
