import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageAddiction, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class AddictionService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.ADDICTION_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageAddiction> {
    const res = await this.httpService.getRequest<IResponse<IManageAddiction>>(LovApiUrl.ADDICTION + '/' + id);
    return res as IManageAddiction;
  }

  async manageAddiction(payload: IManageAddiction): Promise<IManageAddiction> {
    const res = await this.httpService.postRequest<IResponse<IManageAddiction>>(LovApiUrl.MANAGE_ADDICTION, payload);
    return res as IManageAddiction;
  }
}
