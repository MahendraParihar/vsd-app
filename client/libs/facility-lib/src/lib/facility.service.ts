import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { IManageEvent, IManageFacility, IResponse, IStatusChange } from '@vsd-common/lib';
import { FacilityApiUrl } from './api-url';

@Injectable()
export class FacilityService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(FacilityApiUrl.FACILITY_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageFacility> {
    const res = await this.httpService.getRequest<IResponse<IManageEvent>>(FacilityApiUrl.FACILITY + '/' + id);
    return res as IManageFacility;
  }

  async manageEvent(payload: IManageFacility): Promise<IManageFacility> {
    const res = await this.httpService.postRequest<IResponse<IManageFacility>>(FacilityApiUrl.MANAGE_FACILITY, payload);
    return res as IManageFacility;
  }
}
