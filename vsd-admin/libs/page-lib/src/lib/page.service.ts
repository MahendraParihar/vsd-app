import { Injectable } from '@angular/core';
import { ErrorHandlerService, HttpService } from '@vsd-frontend/core-lib';
import { IManageLegalPage, IResponse, IStatusChange } from '@vsd-common/lib';
import { PageApiUrl } from './api-url';

@Injectable()
export class PageService {
  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(PageApiUrl.PAGES + '/' + id, <IStatusChange>{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageLegalPage> {
    const res = await this.httpService.getRequest<IResponse<IManageLegalPage>>(PageApiUrl.PAGES + '/' + id);
    return res as IManageLegalPage;
  }

  async managePages(payload: IManageLegalPage): Promise<IManageLegalPage> {
    const res = await this.httpService.postRequest<IResponse<IManageLegalPage>>(PageApiUrl.MANAGE_PAGES, payload);
    return res as IManageLegalPage;
  }
}
