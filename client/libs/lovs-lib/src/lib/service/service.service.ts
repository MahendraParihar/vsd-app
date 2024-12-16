import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageService, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class ServiceService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.SERVICE_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageService> {
    const res = await this.httpService.getRequest<IResponse<IManageService>>(LovApiUrl.SERVICE + '/' + id);
    return res as IManageService;
  }

  async manageService(payload: IManageService): Promise<IManageService> {
    const res = await this.httpService.postRequest<IResponse<IManageService>>(LovApiUrl.MANAGE_SERVICE, payload);
    return res as IManageService;
  }
}
