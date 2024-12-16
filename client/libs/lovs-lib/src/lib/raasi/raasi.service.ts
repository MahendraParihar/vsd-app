import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageRaasi, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class RaasiService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.RAASI_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageRaasi> {
    const res = await this.httpService.getRequest<IResponse<IManageRaasi>>(LovApiUrl.RAASI + '/' + id);
    return res as IManageRaasi;
  }

  async manageRaasi(payload: IManageRaasi): Promise<IManageRaasi> {
    const res = await this.httpService.postRequest<IResponse<IManageRaasi>>(LovApiUrl.MANAGE_RAASI, payload);
    return res as IManageRaasi;
  }
}
