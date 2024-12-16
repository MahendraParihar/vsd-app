import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageBusiness, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class BusinessService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.BUSINESS_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageBusiness> {
    const res = await this.httpService.getRequest<IResponse<IManageBusiness>>(LovApiUrl.BUSINESS + '/' + id);
    return res as IManageBusiness;
  }

  async manageBusiness(payload: IManageBusiness): Promise<IManageBusiness> {
    const res = await this.httpService.postRequest<IResponse<IManageBusiness>>(LovApiUrl.MANAGE_BUSINESS, payload);
    return res as IManageBusiness;
  }
}
