import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageCityVillage, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class CityVillageService {
  constructor(private httpService: HttpService) {}

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.CITY_VILLAGE_STATUS + '/' + id, <IStatusChange>{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageCityVillage> {
    const res = await this.httpService.getRequest<IResponse<IManageCityVillage>>(LovApiUrl.CITY_VILLAGE + '/' + id);
    return res as IManageCityVillage;
  }

  async manageCityVillage(payload: IManageCityVillage): Promise<IManageCityVillage> {
    const res = await this.httpService.postRequest<IResponse<IManageCityVillage>>(
      LovApiUrl.MANAGE_CITY_VILLAGE,
      payload,
    );
    return res as IManageCityVillage;
  }
}
