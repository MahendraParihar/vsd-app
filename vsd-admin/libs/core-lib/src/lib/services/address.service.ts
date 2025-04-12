import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ApiUrls } from '../api-urls';
import { IAddressMaster, IResponse } from '@vsd-common/lib';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private httService: HttpService) {
  }

  async loadAddressMasterData(): Promise<IAddressMaster> {
    const res = await this.httService.getRequest<IResponse<IAddressMaster>>(ApiUrls.ADDRESS_MASTER_DATA);
    return res as IAddressMaster;
  }
}
