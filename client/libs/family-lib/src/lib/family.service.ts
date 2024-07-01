import {Injectable} from '@angular/core';
import {ErrorHandlerService, HttpService} from '@vsd-frontend/core-lib';
import {IStatusChange} from '@vsd-common/lib';
import {FamilyApiUrl} from "./api-url";

@Injectable()
export class FamilyService {
  constructor(private httpService: HttpService,
              private errorHandlerService: ErrorHandlerService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(FamilyApiUrl.FAMILY_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }
}
