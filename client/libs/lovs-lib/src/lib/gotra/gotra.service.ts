import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class GotraService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.GOTRA_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }
}
