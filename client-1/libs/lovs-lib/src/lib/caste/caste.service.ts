import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageCaste, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class CasteService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.CASTE_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageCaste> {
    const res = await this.httpService.getRequest<IResponse<IManageCaste>>(LovApiUrl.CASTE + '/' + id);
    return res as IManageCaste;
  }

  async manageCaste(payload: IManageCaste): Promise<IManageCaste> {
    const res = await this.httpService.postRequest<IResponse<IManageCaste>>(LovApiUrl.MANAGE_CASTE, payload);
    return res as IManageCaste;
  }
}
