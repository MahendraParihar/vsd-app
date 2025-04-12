import { Injectable } from '@angular/core';
import { ErrorHandlerService, HttpService } from '@vsd-frontend/core-lib';
import { IManageBanner, IResponse, IStatusChange } from '@vsd-common/lib';
import { BannerApiUrl } from './api-url';

@Injectable()
export class BannerService {
  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(BannerApiUrl.BANNER_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageBanner> {
    const res = await this.httpService.getRequest<IResponse<IManageBanner>>(BannerApiUrl.BANNER + '/' + id);
    return res as IManageBanner;
  }

  async manageBanner(payload: IManageBanner): Promise<IManageBanner> {
    const res = await this.httpService.postRequest<IResponse<IManageBanner>>(BannerApiUrl.MANAGE_BANNER, payload);
    return res as IManageBanner;
  }
}
