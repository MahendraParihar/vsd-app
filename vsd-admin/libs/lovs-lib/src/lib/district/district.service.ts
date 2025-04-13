import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageDistrict, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class DistrictService {
  constructor(private httpService: HttpService) {}

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.DISTRICT_STATUS + '/' + id, <IStatusChange>{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageDistrict> {
    const res = await this.httpService.getRequest<IResponse<IManageDistrict>>(LovApiUrl.DISTRICT + '/' + id);
    return res as IManageDistrict;
  }

  async manageDistrict(payload: IManageDistrict): Promise<IManageDistrict> {
    const res = await this.httpService.postRequest<IResponse<IManageDistrict>>(LovApiUrl.MANAGE_DISTRICT, payload);
    return res as IManageDistrict;
  }
}
