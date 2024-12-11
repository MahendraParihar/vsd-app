import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { IMandal, IResponse, IStatusChange } from '@vsd-common/lib';
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

  async loadDetails(id: number): Promise<IMandal> {
    const res = await this.httpService.getRequest<IResponse<IMandal>>(MandalApiUrl.MANDAL + '/' + id);
    return res.data as IMandal;
  }
}
