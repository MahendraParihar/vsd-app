import { Injectable } from '@angular/core';
import { ErrorHandlerService, HttpService } from '@vsd-frontend/core-lib';
import { IManageFaq, IResponse, IStatusChange } from '@vsd-common/lib';
import { FaqApiUrl } from './api-url';

@Injectable()
export class FaqService {
  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(FaqApiUrl.FAQ_STATUS + '/' + id, <IStatusChange>{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageFaq> {
    const res = await this.httpService.getRequest<IResponse<IManageFaq>>(FaqApiUrl.FAQ + '/' + id);
    return res as IManageFaq;
  }

  async manageFaq(payload: IManageFaq): Promise<IManageFaq> {
    const res = await this.httpService.postRequest<IResponse<IManageFaq>>(FaqApiUrl.MANAGE_FAQ, payload);
    return res as IManageFaq;
  }
}
