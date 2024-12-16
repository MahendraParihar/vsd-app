import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageMatrimonialStatus, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class MatrimonialStatusService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.MATRIMONIAL_STATUS_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageMatrimonialStatus> {
    const res = await this.httpService.getRequest<IResponse<IManageMatrimonialStatus>>(LovApiUrl.MATRIMONIAL_STATUS + '/' + id);
    return res as IManageMatrimonialStatus;
  }

  async manageMatrimonialStatus(payload: IManageMatrimonialStatus): Promise<IManageMatrimonialStatus> {
    const res = await this.httpService.postRequest<IResponse<IManageMatrimonialStatus>>(LovApiUrl.MANAGE_MATRIMONIAL_STATUS, payload);
    return res as IManageMatrimonialStatus;
  }
}
