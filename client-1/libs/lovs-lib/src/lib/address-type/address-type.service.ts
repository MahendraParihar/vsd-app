import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageAddressType, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class AddressTypeService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.ADDRESS_TYPE_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageAddressType> {
    const res = await this.httpService.getRequest<IResponse<IManageAddressType>>(LovApiUrl.ADDRESS_TYPE + '/' + id);
    return res as IManageAddressType;
  }

  async manageAddressType(payload: IManageAddressType): Promise<IManageAddressType> {
    const res = await this.httpService.postRequest<IResponse<IManageAddressType>>(LovApiUrl.MANAGE_ADDRESS_TYPE, payload);
    return res as IManageAddressType;
  }
}
