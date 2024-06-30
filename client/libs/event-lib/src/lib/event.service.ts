import {Injectable} from '@angular/core';
import {ErrorHandlerService, HttpService} from '@vsd-frontend/core-lib';
import {IStatusChange} from '@vsd-common/lib';
import {EventApiUrl} from "./api-url";

@Injectable()
export class EventService {
  constructor(private httpService: HttpService,
              private errorHandlerService: ErrorHandlerService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(EventApiUrl.EVENT_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }
}
