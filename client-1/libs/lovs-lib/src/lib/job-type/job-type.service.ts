import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageJobType, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class JobTypeService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.JOB_TYPE_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageJobType> {
    const res = await this.httpService.getRequest<IResponse<IManageJobType>>(LovApiUrl.JOB_TYPE + '/' + id);
    return res as IManageJobType;
  }

  async manageJobType(payload: IManageJobType): Promise<IManageJobType> {
    const res = await this.httpService.postRequest<IResponse<IManageJobType>>(LovApiUrl.MANAGE_JOB_TYPE, payload);
    return res as IManageJobType;
  }
}
