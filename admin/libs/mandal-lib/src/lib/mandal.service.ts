import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { IManageMandal, IResponse, IStatusChange } from '@vsd-common/lib';
import { MandalApiUrl } from './api-url';

@Injectable()
export class MandalService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(MandalApiUrl.MANDAL_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageMandal> {
    const res = await this.httpService.getRequest<IResponse<IManageMandal>>(MandalApiUrl.MANDAL + '/' + id);
    return res as IManageMandal;
  }

  async manageMandal(payload: IManageMandal): Promise<IManageMandal> {
    const res = await this.httpService.postRequest<IResponse<IManageMandal>>(MandalApiUrl.MANAGE_MANDAL, payload);
    return res as IManageMandal;
  }
}
