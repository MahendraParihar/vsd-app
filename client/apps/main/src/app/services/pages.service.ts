import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { IManageLegalPage, IResponse, IStatusChange } from '@vsd-common/lib';
import { ApiUrl } from '../api.url';

@Injectable()
export class PagesService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(ApiUrl.PAGES + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageLegalPage> {
    const res = await this.httpService.getRequest<IResponse<IManageLegalPage>>(ApiUrl.PAGES + '/' + id);
    return res as IManageLegalPage;
  }

  async managePages(payload: IManageLegalPage): Promise<IManageLegalPage> {
    const res = await this.httpService.postRequest<IResponse<IManageLegalPage>>(ApiUrl.MANAGE_PAGES, payload);
    return res as IManageLegalPage;
  }
}
