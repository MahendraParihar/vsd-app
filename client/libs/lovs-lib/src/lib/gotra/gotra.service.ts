import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageGotra, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class GotraService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.GOTRA_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageGotra> {
    const res = await this.httpService.getRequest<IResponse<IManageGotra>>(LovApiUrl.GOTRA + '/' + id);
    return res as IManageGotra;
  }

  async manageGotra(payload: IManageGotra): Promise<IManageGotra> {
    const res = await this.httpService.postRequest<IResponse<IManageGotra>>(LovApiUrl.MANAGE_GOTRA, payload);
    return res as IManageGotra;
  }
}
