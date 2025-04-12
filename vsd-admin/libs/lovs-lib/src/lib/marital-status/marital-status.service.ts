import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageMaritalStatus, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class MaritalStatusService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.MARITAL_STATUS_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageMaritalStatus> {
    const res = await this.httpService.getRequest<IResponse<IManageMaritalStatus>>(LovApiUrl.MARITAL_STATUS + '/' + id);
    return res as IManageMaritalStatus;
  }

  async manageMaritalStatus(payload: IManageMaritalStatus): Promise<IManageMaritalStatus> {
    const res = await this.httpService.postRequest<IResponse<IManageMaritalStatus>>(LovApiUrl.MANAGE_MARITAL_STATUS, payload);
    return res as IManageMaritalStatus;
  }
}
