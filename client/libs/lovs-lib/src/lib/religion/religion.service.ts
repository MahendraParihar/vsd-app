import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageReligion, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class ReligionService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.RELIGION_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageReligion> {
    const res = await this.httpService.getRequest<IResponse<IManageReligion>>(LovApiUrl.RELIGION + '/' + id);
    return res as IManageReligion;
  }

  async manageReligion(payload: IManageReligion): Promise<IManageReligion> {
    const res = await this.httpService.postRequest<IResponse<IManageReligion>>(LovApiUrl.MANAGE_RELIGION, payload);
    return res as IManageReligion;
  }
}
