import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageMatrimonialRequestedStatus, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class MatrimonialRequestedStatusService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.MATRIMONIAL_REQUESTED_STATUS_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageMatrimonialRequestedStatus> {
    const res = await this.httpService.getRequest<IResponse<IManageMatrimonialRequestedStatus>>(LovApiUrl.MATRIMONIAL_REQUESTED_STATUS + '/' + id);
    return res as IManageMatrimonialRequestedStatus;
  }

  async manageMatrimonialRequestedStatus(payload: IManageMatrimonialRequestedStatus): Promise<IManageMatrimonialRequestedStatus> {
    const res = await this.httpService.postRequest<IResponse<IManageMatrimonialRequestedStatus>>(LovApiUrl.MANAGE_MATRIMONIAL_REQUESTED_STATUS, payload);
    return res as IManageMatrimonialRequestedStatus;
  }
}
