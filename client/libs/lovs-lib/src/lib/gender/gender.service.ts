import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageGender, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class GenderService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.GENDER_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageGender> {
    const res = await this.httpService.getRequest<IResponse<IManageGender>>(LovApiUrl.GENDER + '/' + id);
    return res as IManageGender;
  }

  async manageGender(payload: IManageGender): Promise<IManageGender> {
    const res = await this.httpService.postRequest<IResponse<IManageGender>>(LovApiUrl.MANAGE_GENDER, payload);
    return res as IManageGender;
  }
}
