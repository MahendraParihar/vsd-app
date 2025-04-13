import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageState, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class StateService {
  constructor(private httpService: HttpService) {}

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.STATE_STATUS + '/' + id, <IStatusChange>{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageState> {
    const res = await this.httpService.getRequest<IResponse<IManageState>>(LovApiUrl.STATE + '/' + id);
    return res as IManageState;
  }

  async manageState(payload: IManageState): Promise<IManageState> {
    const res = await this.httpService.postRequest<IResponse<IManageState>>(LovApiUrl.MANAGE_STATUS, payload);
    return res as IManageState;
  }
}
