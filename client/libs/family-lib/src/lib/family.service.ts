import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { IManageFamily, IResponse, IStatusChange } from '@vsd-common/lib';
import { FamilyApiUrl } from './api-url';

@Injectable()
export class FamilyService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(FamilyApiUrl.FAMILY_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageFamily> {
    const res = await this.httpService.getRequest<IResponse<IManageFamily>>(FamilyApiUrl.FAMILY + '/' + id);
    return res as IManageFamily;
  }

  async manageFamily(payload: IManageFamily): Promise<IManageFamily> {
    const res = await this.httpService.postRequest<IResponse<IManageFamily>>(FamilyApiUrl.MANAGE_FAMILY, payload);
    return res as IManageFamily;
  }
}
