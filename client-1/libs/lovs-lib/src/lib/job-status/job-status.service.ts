import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageJobStatus, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class JobStatusService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.JOB_STATUS_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageJobStatus> {
    const res = await this.httpService.getRequest<IResponse<IManageJobStatus>>(LovApiUrl.JOB_STATUS + '/' + id);
    return res as IManageJobStatus;
  }

  async manageJobStatus(payload: IManageJobStatus): Promise<IManageJobStatus> {
    const res = await this.httpService.postRequest<IResponse<IManageJobStatus>>(LovApiUrl.MANAGE_JOB_STATUS, payload);
    return res as IManageJobStatus;
  }
}
