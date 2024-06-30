import { Injectable } from '@angular/core';
import { ErrorHandlerService, HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class AddictionService {
  constructor(private httpService: HttpService,
              private errorHandlerService: ErrorHandlerService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.ADDICTION_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }
}
