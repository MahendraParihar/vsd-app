import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { IManageTemple, IResponse, IStatusChange } from '@vsd-common/lib';
import { TempleApiUrl } from './api-url';

@Injectable()
export class TempleService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(TempleApiUrl.TEMPLE_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageTemple> {
    const res = await this.httpService.getRequest<IResponse<IManageTemple>>(TempleApiUrl.TEMPLE + '/' + id);
    return res as IManageTemple;
  }

  async manageTemple(payload: IManageTemple): Promise<IManageTemple> {
    const res = await this.httpService.postRequest<IResponse<IManageTemple>>(TempleApiUrl.MANAGE_TEMPLE, payload);
    return res as IManageTemple;
  }
}
