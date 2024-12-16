import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageContactType, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class ContactTypeService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.CONTACT_TYPE_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageContactType> {
    const res = await this.httpService.getRequest<IResponse<IManageContactType>>(LovApiUrl.CONTACT_TYPE + '/' + id);
    return res as IManageContactType;
  }

  async manageContactType(payload: IManageContactType): Promise<IManageContactType> {
    const res = await this.httpService.postRequest<IResponse<IManageContactType>>(LovApiUrl.MANAGE_CONTACT_TYPE, payload);
    return res as IManageContactType;
  }
}
