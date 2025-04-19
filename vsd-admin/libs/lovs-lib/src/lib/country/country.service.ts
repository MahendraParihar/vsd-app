import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageCountry, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class CountryService {
  constructor(private httpService: HttpService) {}

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.COUNTRY_STATUS + '/' + id, <IStatusChange>{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageCountry> {
    const res = await this.httpService.getRequest<IResponse<IManageCountry>>(LovApiUrl.COUNTRY + '/' + id);
    return res as IManageCountry;
  }

  async manageCountry(payload: IManageCountry): Promise<IManageCountry> {
    const res = await this.httpService.postRequest<IResponse<IManageCountry>>(LovApiUrl.MANAGE_COUNTRY, payload);
    return res as IManageCountry;
  }
}
